"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importCategories = exports.deleteAllCategories = void 0;
// import { Category as CtCategory} from '@commercetools/platform-sdk';
const categories_services_1 = require("../services/categories.services");
const helpers_1 = require("../helpers");
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
dotenv.config();
// Standard delete operation for categories
exports.deleteAllCategories = (0, helpers_1.createStandardDelete)({
    itemName: 'categories',
    service: () => categories_services_1.categoriesService.where('parent is not defined'),
});
// Helper function to map categories and set parent references
const setCategoryData = (category) => (Object.assign({}, category));
// Group categories by their parent-child relationships
const setParent = (categories) => {
    const byExternalId = categories.reduce((result, category) => result.set(category.externalId, category), new Map());
    return Array.from(byExternalId.values()).map((category) => {
        var _a;
        const categoryCopy = setCategoryData(category);
        categoryCopy.parent = categoryCopy.parentId
            ? (_a = byExternalId.get(categoryCopy.parentId)) === null || _a === void 0 ? void 0 : _a.key
            : undefined;
        delete categoryCopy.parentId;
        return categoryCopy;
    });
};
// Recursive function to group categories by parent
const groupByParent = (categories) => {
    const recur = (categories, map, keys, level) => {
        if (!categories.length) {
            return map;
        }
        // Add children only AFTER a possible parent has been added
        categories.forEach((category) => {
            var _a;
            if (keys.includes(category.parent)) {
                map.set(level, ((_a = map.get(level)) === null || _a === void 0 ? void 0 : _a.concat(category)) || []);
            }
        });
        const currentKeys = Array.from(map.values())
            .flat()
            .map((category) => category.key);
        // Recursively call with categories that are in the map removed
        return recur(categories.filter((category) => !currentKeys.includes(category.key)), map.set(level + 1, []), // set the next level
        currentKeys, level + 1);
    };
    return Array.from(recur(categories, new Map([[0, []]]), [undefined], 0).values()).filter((categories) => categories.length); // filter out empty ones
};
// Save categories recursively
const saveRecursive = (groupedCategories) => {
    const recur = (groupedCategories, index, result) => {
        if (index === groupedCategories.length) {
            return Promise.resolve(result);
        }
        return Promise.all(groupedCategories[index].map((category) => category.parent
            ? Object.assign(Object.assign({}, category), { parent: { key: category.parent } }) : category).map((category) => {
            const request = {
                uri: categories_services_1.categoriesService.build(),
                method: 'POST',
                body: category,
            };
            return (0, helpers_1.execute)(request);
        })).then((result) => recur(groupedCategories, index + 1, result.concat(result)));
    };
    return recur(groupedCategories, 0, []);
};
// Import categories from CSV
const importCategories = (csvFilePath = process.env.CSV_FILE_PATH || './data/categories.csv') => {
    const resolvedPath = path.resolve(csvFilePath);
    return require('csvtojson')()
        .fromFile(resolvedPath)
        .then((rawJson) => saveRecursive(groupByParent(setParent(rawJson))))
        .then(() => console.log('\x1b[32m%s\x1b[0m', 'Categories imported successfully'))
        .catch((err) => (0, helpers_1.logAndExit)(err, 'Failed to import categories'));
};
exports.importCategories = importCategories;
// Execute operations based on environment configuration (via dotenv)
if (process.env.CLEAN === 'true') {
    (0, exports.deleteAllCategories)();
}
else if (process.env.IMPORT === 'true') {
    console.log('\x1b[32m%s\x1b[0m', 'Importing categories...');
    (0, exports.importCategories)(process.env.CSV_FILE_PATH); // CSV path can now be set via environment variable
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcmllcy5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL2NhdGVnb3JpZXMuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVFQUF1RTtBQUN2RSx5RUFBb0U7QUFDcEUsd0NBQXVFO0FBQ3ZFLCtDQUFpQztBQUNqQywyQ0FBNkI7QUFDN0IsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBd0JoQiwyQ0FBMkM7QUFDOUIsUUFBQSxtQkFBbUIsR0FBRyxJQUFBLDhCQUFvQixFQUFDO0lBQ3RELFFBQVEsRUFBRSxZQUFZO0lBQ3RCLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyx1Q0FBaUIsQ0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUM7Q0FDaEUsQ0FBQyxDQUFDO0FBRUgsOERBQThEO0FBQzlELE1BQU0sZUFBZSxHQUFHLENBQUMsUUFBa0IsRUFBWSxFQUFFLENBQUMsbUJBQ3JELFFBQVEsRUFDWCxDQUFDO0FBRUgsdURBQXVEO0FBQ3ZELE1BQU0sU0FBUyxHQUFHLENBQUMsVUFBc0IsRUFBYyxFQUFFO0lBQ3ZELE1BQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FDMUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxFQUFFLElBQUksR0FBRyxFQUFvQixDQUN2RSxDQUFDO0lBRUYsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFOztRQUN4RCxNQUFNLFlBQVksR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsWUFBWSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUTtZQUN6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