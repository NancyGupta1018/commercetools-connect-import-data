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
                body: category
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcmllcy5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL2NhdGVnb3JpZXMuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHlFQUFvRTtBQUNwRSx3Q0FBdUU7QUFDdkUsK0NBQWlDO0FBQ2pDLDJDQUE2QjtBQUM3QixNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUF3QmhCLDJDQUEyQztBQUM5QixRQUFBLG1CQUFtQixHQUFHLElBQUEsOEJBQW9CLEVBQUM7SUFDdEQsUUFBUSxFQUFFLFlBQVk7SUFDdEIsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLHVDQUFpQixDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQztDQUNoRSxDQUFDLENBQUM7QUFFSCw4REFBOEQ7QUFDOUQsTUFBTSxlQUFlLEdBQUcsQ0FBQyxRQUFrQixFQUFZLEVBQUUsQ0FBQyxtQkFDckQsUUFBUSxFQUNYLENBQUM7QUFFSCx1REFBdUQ7QUFDdkQsTUFBTSxTQUFTLEdBQUcsQ0FBQyxVQUFzQixFQUFjLEVBQUU7SUFDdkQsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUMxRCxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLEVBQUUsSUFBSSxHQUFHLEVBQW9CLENBQ3ZFLENBQUM7SUFFRixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7O1FBQ3hELE1BQU0sWUFBWSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQyxZQUFZLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQyxRQUFRO1lBQ3pDLENBQUMsQ0FBQyxN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