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
const importProductTypes = (typesPath = process.cwd() + '/src/data/product-type.json') => (0, helpers_1.readJson)(typesPath)
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
const importProducts = (productPath = process.env.PRODUCTS_CSV_FILE_PATH || './data/products.csv', categoriesPath = process.env.CSV_FILE_PATH || './data/categories.csv', typesPath = process.cwd() + '/src/data/product-type.json', limit = Number.POSITIVE_INFINITY) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdHMuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9wcm9kdWN0cy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtDQUFpRDtBQUNqRCxtREFLNkI7QUFDN0Isd0NBU21CO0FBQ25CLHNEQUFrRDtBQUVsRCxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7QUFDMUIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBRWpCLFFBQUEsaUJBQWlCLEdBQUcsSUFBQSw4QkFBb0IsRUFBQztJQUNwRCxRQUFRLEVBQUUsVUFBVTtJQUNwQixPQUFPLEVBQUUsMEJBQWU7SUFDeEIsY0FBYyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FDMUIsT0FBTyxDQUFDLE9BQU8sQ0FDYixPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVM7UUFDMUIsQ0FBQyxDQUFDLElBQUEsaUJBQU8sRUFBQztZQUNSLEdBQUcsRUFBRSwwQkFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFO1lBQzdDLE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFFO2dCQUNKLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztnQkFDeEIsT0FBTyxFQUFFO29CQUNQO3dCQUNFLE1BQU0sRUFBRSxXQUFXO3FCQUNwQjtpQkFDRjthQUNGO1NBQ0YsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQztRQUMzQixDQUFDLENBQUMsT0FBTyxDQUNaLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FDakIsSUFBQSxpQkFBTyxFQUFDO1FBQ04sR0FBRyxFQUFFLDBCQUFlO2FBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO2FBQ2hCLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO2FBQzVCLEtBQUssRUFBRTtRQUNWLE1BQU0sRUFBRSxRQUFRO0tBQ2pCLENBQUMsQ0FDSDtDQUNKLENBQUMsQ0FBQTtBQUVXLFFBQUEscUJBQXFCLEdBQUcsSUFBQSw4QkFBb0IsRUFBQztJQUN4RCxRQUFRLEVBQUUsZUFBZTtJQUN6QixPQUFPLEVBQUUsOEJBQW1CO0NBQzdCLENBQUMsQ0FBQTtBQUVLLE1BQU0sa0JBQWtCLEdBQUcsQ0FDaEMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyw2QkFBNkIsRUFDekQsRUFBRSxDQUNGLElBQUEsa0JBQVEsRUFBQyxTQUFTLENBQUM7S0FDaEIsSUFBSSxDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FDckIsT0FBTyxDQUFDLEdBQUcsQ0FDVCxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBWSxFQUFFLEVBQUU7SUFDaEMsTUFBTSxhQUFhLEdBQUc7UUFDcEIsR0FBRyxFQUFFLDhCQUFtQixDQUFDLEtBQUssRUFBRTtRQUNoQyxNQUFNLEVBQUUsTUFBTTtRQUNkLElBQUksRUFBRSxPQUFPO0tBQ2QsQ0FBQTtJQUNELE9BQU8sSUFBQSxpQkFBTyxFQUFDLGFBQWEsQ0FBQyxDQUFBO0FBQy9CLENBQUMsQ0FBQyxDQUNILENBQ0Y7S0FDQSxJQUFJLENBQUMsR0FBRyxFQUFFO0FBQ1Qsc0NBQXNDO0FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQ1QsbUJBQW1CLEVBQ25CLHdCQUF3QixDQUN6QixDQUNGO0tBQ0EsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDZixJQUFBLG9CQUFVLEVBQUMsS0FBSyxFQUFFLGdDQUFnQyxDQUFDLENBQ3BELENBQUE7QUF6QlEsUUFBQSxrQkFBa0Isc0JBeUIxQjtBQUNMLE1BQU0sU0FBUyxHQUFHLENBQUMsY0FBbUIsRUFBRSxFQUFFLENBQ3hDLGNBQWM7S0FDWCxXQUFXLEVBQUU7S0FDYixLQUFLLENBQUMsR0FBRyxDQUFDO0tBQ1YsTUFBTSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDckIsR0FBRyxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2hELE1BQU0sY0FBYyxHQUFHLENBQUMsYUFBa0IsRUFBRSxVQUFlLEVBQUUsRUFBRSxDQUM3RCxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7SUFDdEMsTUFBTSxRQUFRLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN4QyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDZCxNQUFNLElBQUksS0FBSyxDQUNiLGlDQUFpQyxJQUFJLEVBQUUsQ0FDeEMsQ0FBQTtJQUNILENBQUM7SUFDRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtBQUM5QixDQUFDLENBQUMsQ0FBQTtBQUNKLE1BQU0sYUFBYSxHQUFHLENBQUMsUUFBYSxFQUFFLEVBQUUsQ0FDdEMsUUFBUTtLQUNMLEdBQUcsQ0FBQyxDQUFDLENBQXFCLEVBQUUsRUFBRSxDQUFDLGlDQUMzQixDQUFDLEtBQ0osWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQ2pDLENBQUM7S0FDRixNQUFNLENBQUMsQ0FBQyxPQUFZLEVBQUUsT0FBWSxFQUFFLEVBQUU7SUFDckMsSUFBSSxPQUFPLENBQUMsWUFBWSxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO1FBQ3ZCLE9BQU8sT0FBTyxDQUFBO0lBQ2hCLENBQUM7SUFDRCxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDekMsT0FBTyxPQUFPLENBQUE7QUFDaEIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBRVYsTUFBTSxPQUFPLEdBQUcsQ0FBQyxjQUFtQixFQUFFLFFBQWEsRUFBRSxFQUFFLENBQUMsQ0FDdEQsV0FBZ0IsRUFDaEIsRUFBRTs7SUFDRixNQUFNLENBQ0osWUFBWSxFQUNaLE1BQU0sRUFDTixTQUFTLENBQ1YsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzNCLE1BQU0sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUM5QyxNQUFNLENBQUMsS0FBSyxFQUFFLGVBQWUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDeEQsTUFBTSxXQUFXLEdBQUcsT0FBTyxJQUFJO1FBQzdCLE9BQU8sRUFBRTtZQUNQLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLEVBQUUsRUFBRSxNQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLDBDQUFFLEVBQUU7U0FDOUI7S0FDRixDQUFBO0lBQ0QsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNyRCxpREFBaUQ7SUFDakQsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztRQUN0QixxQ0FBcUM7UUFDckMsVUFBVSxHQUFHLE1BQU0sQ0FDakIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUM3QyxDQUFBO0lBQ0gsQ0FBQztJQUNELE1BQU0sYUFBYSxHQUFHLFNBQVM7UUFDN0IsQ0FBQyxDQUFDO1lBQ0EsYUFBYSxFQUFFO2dCQUNiLE1BQU0sRUFBRSxnQkFBZ0I7Z0JBQ3hCLEdBQUcsRUFBRSxNQUFBLGNBQWMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLDBDQUFFLEdBQUc7YUFDeEM7U0FDRjtRQUNELENBQUMsQ0FBQyxFQUFFLENBQUE7SUFDTixNQUFNLE9BQU8sR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7SUFDekQsbURBQ0UsS0FBSyxFQUFFO1lBQ0wsWUFBWSxFQUFFLGVBQWUsSUFBSSxZQUFZO1lBQzdDLFVBQVU7U0FDWCxJQUNFLGFBQWEsR0FDYixPQUFPLEdBQ1AsV0FBVyxFQUNmO0FBQ0gsQ0FBQyxDQUFBO0FBQ0QsTUFBTSxRQUFRLEdBQUcsQ0FBQyxZQUFpQixFQUFFLGNBQW1CLEVBQUUsUUFBYSxFQUFFLEVBQUUsQ0FDekUsWUFBWTtLQUNULEtBQUssQ0FBQyxHQUFHLENBQUM7S0FDVixHQUFHLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQztLQUN0QyxNQUFNLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBRTFCLE1BQU0sT0FBTyxHQUFHLENBQUMsR0FBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLEdBQUc7SUFDSCxVQUFVLEVBQUU7UUFDVixDQUFDLEVBQUUsQ0FBQztRQUNKLENBQUMsRUFBRSxDQUFDO0tBQ0w7Q0FDRixDQUFDLENBQUE7QUFDRixNQUFNLFdBQVcsR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFO0lBQzdCLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUNsQyxDQUFDLE1BQVcsRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQzVCLEtBQUssS0FBSyxFQUFFO1FBQ1YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUUsTUFBTSxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxNQUFNLEVBQ1osRUFBRSxDQUNILENBQUE7SUFDRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUE7QUFDbkQsQ0FBQyxDQUFBO0FBQ0QsTUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzdDLE1BQU0sUUFBUSxHQUFHLENBQUMsTUFBVyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUNoRSxNQUFNLFdBQVcsR0FBRyxDQUNsQixhQUFrQixFQUNsQixLQUFVLEVBQ1YsYUFBOEQsRUFDOUQsRUFBRTtJQUNGLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFLENBQUM7UUFDeEMsT0FBTyxjQUFJLENBQUE7SUFDYixDQUFDO0lBQ0QsSUFBSSxhQUFhLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRSxDQUFDO1FBQ3JDLEtBQUssR0FBRyxLQUFLLEtBQUssTUFBTSxDQUFBO0lBQzFCLENBQUM7SUFDRCw0REFBNEQ7SUFDNUQsSUFBSSxhQUFhLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDO1FBQ2pDLElBQUksYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFLENBQUM7WUFDOUMsT0FBTztnQkFDTCxJQUFJLEVBQUUsYUFBYTtnQkFDbkIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDOUMsQ0FBQTtRQUNILENBQUM7UUFDRCxvRUFBb0U7UUFDcEUsa0NBQWtDO1FBQ2xDLE9BQU8sY0FBSSxDQUFBO0lBQ2IsQ0FBQztJQUNELElBQUksYUFBYSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUUsQ0FBQztRQUNuQyxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzFCLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDcEMsT0FBTyxjQUFJLENBQUE7UUFDYixDQUFDO0lBQ0gsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLEVBQUUsYUFBYTtRQUNuQixLQUFLO0tBQ04sQ0FBQTtBQUNILENBQUMsQ0FBQTtBQUNELE1BQU0sYUFBYSxHQUFHLENBQ3BCLGNBQW1CLEVBQ25CLFFBQWEsRUFDYixnQkFBc0QsRUFDdEQsV0FBZ0IsRUFDaEIsRUFBRSxDQUFDLENBQUMsT0FBdUcsRUFBRSxFQUFFO0lBQy9HLE1BQU0sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsT0FBTyxDQUFBO0lBQzlELE9BQU87UUFDTCxFQUFFLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNyQixHQUFHLEVBQUUsVUFBVSxJQUFJLEdBQUc7UUFDdEIsVUFBVSxFQUFFLGdCQUFnQjthQUN6QixHQUFHLENBQUMsV0FBVyxDQUFDO2FBQ2hCLEdBQUcsQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxFQUFFLEVBQUUsQ0FDdEMsV0FBVyxDQUNULGFBQWEsRUFDYixPQUFPLENBQUMsYUFBYSxDQUFDLEVBQ3RCLGFBQWEsQ0FDZCxDQUNGO2FBQ0EsTUFBTSxDQUFDLENBQUMsU0FBYSxFQUFFLEVBQUUsQ0FBQyxTQUFTLEtBQUssY0FBSSxDQUFDO1FBQ2hELEdBQUc7UUFDSCxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsUUFBUSxDQUFDO1FBQ2xELE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDO0tBQ3pCLENBQUE7QUFDSCxDQUFDLENBQUE7QUFDRCxNQUFNLFNBQVMsR0FBRyxDQUNoQixnQkFBbUMsRUFDbkMsY0FBc0MsRUFDdEMsUUFBZ0MsRUFDaEMsZ0JBQStCLEVBQy9CLEVBQUUsQ0FBQyxDQUFDLFFBQWUsRUFBRSxFQUFFO0lBQ3ZCLE1BQU0sRUFDSixXQUFXLEVBQ1gsR0FBRyxFQUNILFVBQVUsRUFDVixJQUFJLEVBQ0osTUFBTSxFQUNOLElBQUksRUFDTCxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNmLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDaEQsT0FBTyxFQUFFLElBQUksRUFBRSxjQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsQ0FBQTtJQUN6RCxDQUFDO0lBQ0QsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztRQUNoRCxPQUFPLEVBQUUsSUFBSSxFQUFFLGNBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxDQUFBO0lBQ3pELENBQUM7SUFDRCxNQUFNLGVBQWUsR0FBRyxVQUFVLENBQ2hDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQ3JDLENBQUE7SUFDRCxNQUFNLFNBQVMsR0FBRyxVQUFVLENBQzFCLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQ25DLENBQUE7SUFDRCxNQUFNLFlBQVksR0FBRyxVQUFVLENBQzdCLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQ3RDLENBQUE7SUFDRCxNQUFNLFdBQVcsR0FBRztRQUNsQixHQUFHLEVBQUUsTUFBTTtRQUNYLFdBQVcsRUFBRSxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsRUFBRSxRQUFRO1FBQzNDLGFBQWEsRUFBRSxhQUFhLENBQzFCLGNBQWMsRUFDZCxRQUFRLEVBQ1IsZ0JBQWdCLEVBQ2hCLFdBQVcsQ0FDWixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLFdBQVcsRUFBRTtZQUNYLEdBQUcsRUFBRSxHQUFHO1NBQ1Q7UUFDRCxVQUFVLEVBQUUsY0FBYyxDQUN4QixnQkFBZ0IsRUFDaEIsVUFBVSxDQUNYO1FBQ0QsUUFBUSxFQUFFLFFBQVE7YUFDZixLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ1IsR0FBRyxDQUNGLGFBQWEsQ0FDWCxjQUFjLEVBQ2QsUUFBUSxFQUNSLGdCQUFnQixFQUNoQixXQUFXLENBQ1osQ0FDRjtRQUNILElBQUksRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsZUFBZTtRQUNmLFNBQVM7UUFDVCxZQUFZO0tBQ2IsQ0FBQTtJQUVELE9BQU8sV0FBVyxDQUFBO0FBQ3BCLENBQUMsQ0FBQTtBQUVNLE1BQU0sY0FBYyxHQUFHLENBQzVCLFdBQVcsR0FBSSxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixJQUFJLHFCQUFxQixFQUMxRSxjQUFjLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUcsdUJBQXVCLEVBQ3BFLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsNkJBQTZCLEVBQ3pELEtBQUssR0FBRyxNQUFNLENBQUMsaUJBQWlCLEVBQ2hDLEVBQUU7SUFDRixNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDaEMsTUFBTSxVQUFVLEdBQUcsSUFBSSx3QkFBUyxDQUM5QjtRQUNFLE1BQU0sRUFDSiw0QkFBNEI7WUFDNUIsb0RBQW9EO1FBQ3RELGVBQWUsRUFBRSxRQUFRO1FBQ3pCLGlCQUFpQixFQUFFLFFBQVE7S0FDNUIsRUFDRCxzQkFBTyxDQUFDLElBQUksQ0FDYixDQUFBO0lBQ0QsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFO1NBQ3JCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FDVCxPQUFPLENBQUMsR0FBRyxDQUNULENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQztTQUMxQixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuQyxNQUFNLENBQUM7UUFDTixJQUFBLGdCQUFNLEVBQ0osaUJBQU8sRUFDUCwrQkFBb0IsQ0FDckIsQ0FBQztZQUNBLE1BQU0sRUFBRSxLQUFLO1NBQ2QsQ0FBQztRQUNGLElBQUEsZ0JBQU0sRUFDSixpQkFBTyxFQUNQLDBCQUFlLENBQ2hCLENBQUM7WUFDQSxNQUFNLEVBQUUsS0FBSztTQUNkLENBQUM7UUFDRixJQUFBLGtCQUFRLEVBQUMsU0FBUyxDQUFDO0tBQ3BCLENBQUMsQ0FDTCxDQUNGO1NBQ0EsSUFBSSxDQUNILENBQUMsQ0FDQyxXQUFXLEVBQ1gsYUFBYSxFQUNiLGNBQWMsRUFDZCxRQUFRLEVBQ1IsWUFBWSxDQUNiLEVBQUUsRUFBRTtRQUNILE1BQU0sZ0JBQWdCLEdBQUcsSUFBQSxlQUFLLEVBQUMsQ0FBQyxDQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQ2xELGFBQWEsQ0FDZCxDQUFBO1FBQ0QsTUFBTSxtQkFBbUIsR0FBRyxJQUFBLGtCQUFRLEVBQUMsY0FBYyxDQUFDLENBQUE7UUFDcEQsTUFBTSxhQUFhLEdBQUcsSUFBQSxrQkFBUSxFQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3hDLE1BQU0sZ0JBQWdCLEdBQUc7WUFDdkIsR0FBRyxJQUFBLGVBQUssRUFBQyxDQUFDLENBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sRUFBRTtTQUNuRCxDQUFDLE1BQU0sQ0FDTixDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQ3ZCLE1BQU0sQ0FBQyxHQUFHLENBQ1IsR0FBRyxFQUNILEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBMkIsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUN4RSxFQUNILElBQUksR0FBRyxFQUFFLENBQ1YsQ0FBQTtRQUNELE1BQU0sZUFBZSxHQUFHLGFBQWEsQ0FDbkMsV0FBVyxDQUNaLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUNqQixVQUFVLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQy9DLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQTtRQUNqQixNQUFNLGNBQWMsR0FBRyxlQUFlO2FBQ25DLEdBQUcsQ0FDRixTQUFTLENBQ1AsZ0JBQWdCLEVBQ2hCLG1CQUFtQixFQUNuQixhQUFhLEVBQ2IsZ0JBQWdCLENBQ2pCLENBQ0Y7YUFDQSxNQUFNLENBQ0wsQ0FBQyxDQUFxQyxFQUFFLEVBQUUsQ0FDeEMsQ0FBQywrQkFBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUNoRCxDQUFBO1FBQ0gsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUNoQixjQUFjLENBQUMsR0FBRztRQUNoQixxQkFBcUI7UUFDckIsQ0FBQyxPQUFZLEVBQUUsRUFBRSxDQUNmLElBQUEsaUJBQU8sRUFBQztZQUNOLEdBQUcsRUFBRSwwQkFBZSxDQUFDLEtBQUssRUFBRTtZQUM1QixNQUFNLEVBQUUsTUFBTTtZQUNkLElBQUksRUFBRSxPQUFPO1NBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2YsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFBO1lBQzlCLE9BQU8sSUFBSSxDQUFBO1FBQ2IsQ0FBQyxDQUFDLENBQ0wsQ0FDRixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDVixVQUFVLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDbkIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDLENBQ0Y7U0FDQSxJQUFJLENBQUMsR0FBRyxFQUFFO0lBQ1Qsc0NBQXNDO0lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsbUJBQW1CLENBQUMsQ0FDdEQ7U0FDQSxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUNoQixVQUFVLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDakIsT0FBTyxJQUFBLG9CQUFVLEVBQUMsTUFBTSxFQUFFLDJCQUEyQixDQUFDLENBQUE7SUFDeEQsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUE7QUExR1ksUUFBQSxjQUFjLGtCQTBHMUI7QUFDRCxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztJQUN2QixJQUFBLHlCQUFpQixHQUFFLENBQUMsSUFBSSxDQUFDLDZCQUFxQixDQUFDLENBQUE7QUFDakQsQ0FBQztLQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDO0lBQ3BDLElBQUEsMEJBQWtCLEVBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO0FBQ3hDLENBQUM7S0FBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztJQUMvQixzQ0FBc0M7SUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSx1QkFBdUIsQ0FBQyxDQUFBO0lBQ3pELElBQUEsc0JBQWMsRUFDWixLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUNoQixLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxFQUN2QixLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUNuQixDQUFBO0FBQ0gsQ0FBQyJ9