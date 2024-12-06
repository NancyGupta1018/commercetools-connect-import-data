"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importProducts = exports.importProductTypes = exports.deleteAllProductTypes = exports.deleteAllProducts = void 0;
const cli_progress_1 = require("cli-progress");
const services_1 = require("../services/services");
const helpers_1 = require("../helpers");
const ignoreProducts_1 = require("../ignoreProducts");
require('dotenv').config();
const nconf = require('nconf');
exports.deleteAllProducts = (0, helpers_1.createStandardDelete)({
    itemName: 'products',
    service: services_1.productsService,
    deleteFunction: (product) => Promise.resolve(product.masterData.published
        ? (0, helpers_1.execute)({
            uri: services_1.productsService.byId(product.id).build(),
            method: 'POST',
            body: {
                version: product.version,
                actions: [
                    {
                        action: 'unpublish'
                    }
                ]
            }
        }).then(({ body }) => body)
        : product).then((product) => (0, helpers_1.execute)({
        uri: services_1.productsService
            .byId(product.id)
            .withVersion(product.version)
            .build(),
        method: 'DELETE'
    }))
});
exports.deleteAllProductTypes = (0, helpers_1.createStandardDelete)({
    itemName: 'product types',
    service: services_1.productTypesService
});
const importProductTypes = (typesPath = 'C:/Connecters-application/commercetools-connect-import-data/import-data/src/data/product-type.json') => (0, helpers_1.readJson)(typesPath)
    .then((productTypes) => Promise.all(productTypes.map((element) => {
    const updateRequest = {
        uri: services_1.productTypesService.build(),
        method: 'POST',
        body: element
    };
    return (0, helpers_1.execute)(updateRequest);
})))
    .then(() => 
// eslint-disable-next-line no-console
console.log('\x1b[32m%s\x1b[0m', 'Product types imported'))
    .catch((error) => (0, helpers_1.logAndExit)(error, 'Failed to import product types'));
exports.importProductTypes = importProductTypes;
const asSlugsEn = (categoryString) => categoryString
    .toLowerCase()
    .split(';')
    .filter((c) => c)
    .map((c) => c.replace(/>|\s/g, '-'));
const withCategories = (allCategories, categories) => asSlugsEn(categories).map((slug) => {
    const category = allCategories.get(slug);
    if (!category) {
        throw new Error(`Cannot find category for slug:${slug}`);
    }
    return { key: category.key };
});
const groupProducts = (products) => products
    .map((p) => (Object.assign(Object.assign({}, p), { variantIdNum: Number(p.variantId) })))
    .reduce((grouped, product) => {
    if (product.variantIdNum === 1) {
        grouped.push([product]);
        return grouped;
    }
    grouped[grouped.length - 1].push(product);
    return grouped;
}, []);
const toPrice = (customerGroups, channels) => (stringPrice) => {
    var _a, _b;
    const [currencyCode, amount, custGroup] = stringPrice.split(/\s/);
    const [newAmount, channel] = amount.split('#');
    const [cntry, newCurrencyCode] = currencyCode.split(/-/);
    const channelInfo = channel && {
        channel: {
            typeId: 'channel',
            id: (_a = channels.get(channel)) === null || _a === void 0 ? void 0 : _a.id
        }
    };
    let centAmount = Number(channel ? newAmount : amount);
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(centAmount)) {
        // prices like 1|2; 2 will be ignored
        centAmount = Number((channel ? newAmount : amount).split('|')[0]);
    }
    const customerGroup = custGroup
        ? {
            customerGroup: {
                typeId: 'customer-group',
                key: (_b = customerGroups.get(custGroup)) === null || _b === void 0 ? void 0 : _b.key
            }
        }
        : {};
    const country = newCurrencyCode ? { country: cntry } : {};
    return Object.assign(Object.assign(Object.assign({ value: {
            currencyCode: newCurrencyCode || currencyCode,
            centAmount
        } }, customerGroup), country), channelInfo);
};
const toPrices = (stringPrices, customerGroups, channels) => stringPrices
    .split(';')
    .map(toPrice(customerGroups, channels))
    .filter((x) => x);
const toImage = (url) => ({
    url,
    dimensions: {
        w: 0,
        h: 0
    }
});
const removeEmpty = (o) => {
    const ret = Object.entries(o).reduce((result, [key, value]) => value !== ''
        ? ((result[key] = value), result)
        : result, {});
    return Object.keys(ret).length === 0 ? helpers_1.NONE : ret;
};
const noAllEmpty = (o) => Object.keys(o).length === 0 ? undefined : o;
const toImages = (images) => images.split(';').map(toImage);
const toAttribute = (attributeName, value, attributeType) => {
    if (value === undefined || value === '') {
        return helpers_1.NONE;
    }
    if (attributeType.name === 'boolean') {
        value = value === 'TRUE';
    }
    // "dateTime","lenum", "enum" and "text" don't need anything
    if (attributeType.name === 'set') {
        if (attributeType.elementType.name === 'text') {
            return {
                name: attributeName,
                value: value.split(';').filter((x) => x)
            };
        }
        // details is set of ltext but does not have a value for any product
        //  therefor it is ignored for now
        return helpers_1.NONE;
    }
    if (attributeType.name === 'ltext') {
        value = removeEmpty(value);
        if (Object.keys(value).length === 0) {
            return helpers_1.NONE;
        }
    }
    return {
        name: attributeName,
        value
    };
};
const createVariant = (customerGroups, channels, attributesByType, productType) => (product) => {
    const { variantId, sku, prices, images, variantKey } = product;
    return {
        id: Number(variantId),
        key: variantKey || sku,
        attributes: attributesByType
            .get(productType)
            .map(([attributeName, attributeType]) => toAttribute(attributeName, product[attributeName], attributeType))
            .filter((attribute) => attribute !== helpers_1.NONE),
        sku,
        prices: toPrices(prices, customerGroups, channels),
        images: toImages(images)
    };
};
const toProduct = (categoriesBySlug, customerGroups, channels, attributesByType) => (products) => {
    const { productType, tax, categories, name, baseId, slug } = products[0];
    if (Object.keys(removeEmpty(name)).length === 0) {
        return { type: helpers_1.NONE, products, rejected: 'empty name' };
    }
    if (Object.keys(removeEmpty(slug)).length === 0) {
        return { type: helpers_1.NONE, products, rejected: 'empty slug' };
    }
    const metaDescription = noAllEmpty(removeEmpty(products[0].description));
    const metaTitle = noAllEmpty(removeEmpty(products[0].metaTitle));
    const metaKeywords = noAllEmpty(removeEmpty(products[0].metaKeywords));
    const mainProduct = {
        key: baseId,
        productType: { key: productType }, // is ok
        masterVariant: createVariant(customerGroups, channels, attributesByType, productType)(products[0]),
        taxCategory: {
            key: tax
        },
        categories: withCategories(categoriesBySlug, categories),
        variants: products
            .slice(1)
            .map(createVariant(customerGroups, channels, attributesByType, productType)),
        name: removeEmpty(name),
        slug: removeEmpty(slug),
        publish: true,
        metaDescription,
        metaTitle,
        metaKeywords
    };
    return mainProduct;
};
const importProducts = (productPath = 'C:/Connecters-application/commercetools-connect-import-data/import-data/src/data/products.csv', categoriesPath = 'C:/Connecters-application/commercetools-connect-import-data/import-data/src/data/categories.csv', typesPath = 'C:/Connecters-application/commercetools-connect-import-data/import-data/src/data/product-type.json', limit = Number.POSITIVE_INFINITY) => {
    const csv = require('csvtojson');
    const notifySave = new cli_progress_1.SingleBar({
        format: 'Save products      {bar} |' +
            '| {percentage}% || {value}/{total} master variants',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591'
    }, cli_progress_1.Presets.rect);
    return Promise.resolve()
        .then(() => Promise.all([productPath, categoriesPath]
        .map((path) => csv().fromFile(path))
        .concat([
        (0, helpers_1.getAll)(helpers_1.execute, services_1.customerGroupService)({
            method: 'GET'
        }),
        (0, helpers_1.getAll)(helpers_1.execute, services_1.channelsService)({
            method: 'GET'
        }),
        (0, helpers_1.readJson)(typesPath)
    ])))
        .then(([rawProducts, rawCategories, customerGroups, channels, productTypes]) => {
        const categoriesBySlug = (0, helpers_1.setBy)((x) => x.slug.en)(rawCategories);
        const customerGroupsByKey = (0, helpers_1.setByKey)(customerGroups);
        const channelsByKey = (0, helpers_1.setByKey)(channels);
        const attributesByType = [
            ...(0, helpers_1.setBy)((x) => x.key)(productTypes).entries()
        ].reduce((result, [key, value]) => result.set(key, value.attributes.map((v) => [v.name, v.type])), new Map());
        const groupedProducts = groupProducts(rawProducts).slice(0, limit);
        notifySave.start(groupedProducts.length, 0, {});
        let processed = 0;
        const productsToSave = groupedProducts
            .map(toProduct(categoriesBySlug, customerGroupsByKey, channelsByKey, attributesByType))
            .filter((p) => !ignoreProducts_1.ignoreProducts.includes(p.masterVariant.sku));
        return Promise.all(productsToSave.map(
        // product => product
        (product) => (0, helpers_1.execute)({
            uri: services_1.productsService.build(),
            method: 'POST',
            body: product
        }).then((item) => {
            notifySave.update(++processed);
            return item;
        }))).then(() => {
            notifySave.stop();
        });
    })
        .then(() => 
    // eslint-disable-next-line no-console
    console.log('\x1b[32m%s\x1b[0m', 'Products imported'))
        .catch((reject) => {
        notifySave.stop();
        return (0, helpers_1.logAndExit)(reject, 'Failed to import products');
    });
};
exports.importProducts = importProducts;
if (nconf.get('clean')) {
    (0, exports.deleteAllProducts)().then(exports.deleteAllProductTypes);
}
else if (nconf.get('importtypes')) {
    (0, exports.importProductTypes)(nconf.get('types'));
}
else if (nconf.get('import')) {
    // eslint-disable-next-line no-console
    console.log('\x1b[32m%s\x1b[0m', 'Importing products...');
    (0, exports.importProducts)(nconf.get('csv'), nconf.get('categories'), nconf.get('types'));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdHMuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9wcm9kdWN0cy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtDQUFpRDtBQUNqRCxtREFLNkI7QUFDN0Isd0NBU21CO0FBQ25CLHNEQUFrRDtBQUVsRCxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7QUFDMUIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBRWpCLFFBQUEsaUJBQWlCLEdBQUcsSUFBQSw4QkFBb0IsRUFBQztJQUNwRCxRQUFRLEVBQUUsVUFBVTtJQUNwQixPQUFPLEVBQUUsMEJBQWU7SUFDeEIsY0FBYyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FDMUIsT0FBTyxDQUFDLE9BQU8sQ0FDYixPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVM7UUFDMUIsQ0FBQyxDQUFDLElBQUEsaUJBQU8sRUFBQztZQUNSLEdBQUcsRUFBRSwwQkFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFO1lBQzdDLE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFFO2dCQUNKLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztnQkFDeEIsT0FBTyxFQUFFO29CQUNQO3dCQUNFLE1BQU0sRUFBRSxXQUFXO3FCQUNwQjtpQkFDRjthQUNGO1NBQ0YsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQztRQUMzQixDQUFDLENBQUMsT0FBTyxDQUNaLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FDakIsSUFBQSxpQkFBTyxFQUFDO1FBQ04sR0FBRyxFQUFFLDBCQUFlO2FBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFD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