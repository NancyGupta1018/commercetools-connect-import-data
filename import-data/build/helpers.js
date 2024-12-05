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
exports.createStandardDelete = exports.processAll = exports.logAndExit = exports.readJson = exports.writeFile = exports.readFile = exports.groupBy = exports.setByKey = exports.setBy = exports.NONE = exports.getAll = exports.execute = exports.createRetry = exports.createLimiter = exports.later = void 0;
const services_1 = require("./services/services");
const cli_progress_1 = require("cli-progress");
const fs = __importStar(require("fs"));
const COOL_DOWN_PERIOD = Number(process.env.COOL_DOWN_PERIOD || 15) * 1000;
const MAX_ACTIVE = Number(process.env.MAX_ACTIVE || 25);
const RETRIES = Number(process.env.RETRIES || 5);
const later = (howLong, value) => new Promise((resolve) => setTimeout(() => resolve(value), howLong));
exports.later = later;
const promiseLike = (x) => x !== undefined && typeof x.then === 'function';
const ifPromise = (fn) => (x) => promiseLike(x) ? x.then(fn) : fn(x);
const createLimiter = (max = MAX_ACTIVE) => {
    let que = [];
    let queIndex = -1;
    let running = 0;
    const wait = (resolve, fn, arg) => () => resolve(ifPromise(fn)(arg)) !== undefined || true;
    // resolve(ifPromise(fn)(arg)) !== undefined || true;
    // resolve(ifPromise(fn)(arg)) || true; // should always return true
    const nextInQue = () => {
        ++queIndex;
        if (typeof que[queIndex] === 'function') {
            return que[queIndex]();
        }
        else {
            que = [];
            queIndex = -1;
            running = 0;
            return 'Does not matter, not used';
        }
    };
    const queItem = (fn, arg) => new Promise((resolve) => que.push(wait(resolve, fn, arg)));
    return (fn) => (arg) => {
        const p = queItem(fn, arg).then((x) => nextInQue() && x);
        running++;
        if (running <= max) {
            nextInQue();
        }
        return p;
    };
};
exports.createLimiter = createLimiter;
const createRetry = (retries = RETRIES) => {
    const execute = (fn, tries, args) => Promise.resolve()
        .then(() => fn.apply(null, args))
        .catch((error) => {
        tries++;
        if (error.body && error.body.statusCode === 401) {
            throw error;
        }
        if (tries > retries) {
            throw error;
        }
        return (0, exports.later)(COOL_DOWN_PERIOD).then(() => execute(fn, tries, args));
    });
    return (fn) => function retry(...args) {
        return execute(fn, 0, args);
    };
};
exports.createRetry = createRetry;
exports.execute = (0, exports.createLimiter)()((0, exports.createRetry)()(services_1.client.execute.bind(services_1.client)));
const getAll = (getterFn, service) => (request, statusCallback = (x) => x) => {
    const limit = 100;
    const recur = (result, getterFn, service, goOn, lastId, total) => {
        if (!goOn) {
            return Promise.resolve(result);
        }
        let uriBuilder = service
            .perPage(limit)
            .sort('id', true)
            .withTotal(total === undefined);
        if (lastId) {
            uriBuilder = uriBuilder.where(`id>"${lastId}"`);
        }
        return getterFn(Object.assign(Object.assign({}, request), { uri: uriBuilder.build() })).then((response) => {
            var _a;
            const all = result.concat(response.body.results);
            statusCallback(all.length, total || response.body.total);
            return recur(all, getterFn, service, response.body.count === limit, (_a = response.body.results.slice(-1)[0]) === null || _a === void 0 ? void 0 : _a.id, total || response.body.total);
        });
    };
    return recur([], getterFn, service, true);
};
exports.getAll = getAll;
exports.NONE = {};
const setBy = (getter) => (items) => items.reduce((itemsMap, item) => itemsMap.set(getter(item), item), new Map());
exports.setBy = setBy;
exports.setByKey = (0, exports.setBy)((item) => item.key);
const groupBy = (getter) => (items) => items.reduce((itemsMap, item) => itemsMap.set(getter(item), (itemsMap.get(getter(item)) || []).concat(item)), new Map());
exports.groupBy = groupBy;
const readFile = (filePath, encoding = 'utf8') => new Promise((resolve, reject) => fs.readFile(filePath, encoding, (err, fileContent) => err ? reject(err) : resolve(fileContent)));
exports.readFile = readFile;
const writeFile = (filePath, content) => new Promise((resolve, reject) => fs.writeFile(filePath, content, (err) => err ? reject(err) : resolve()));
exports.writeFile = writeFile;
const readJson = (filePath, encoding = 'utf8') => (0, exports.readFile)(filePath, encoding).then((fileContent) => JSON.parse(fileContent));
exports.readJson = readJson;
const logAndExit = (error, message) => {
    // eslint-disable-next-line no-console
    console.error(`${message}, see import-error.log for more details`);
    const log = Object.keys(error).length
        ? JSON.stringify(error, undefined, 2)
        : JSON.stringify({ message: error.message, stack: error.stack }, undefined, 2);
    const exit = () => {
        process.exit(1);
    };
    return (0, exports.writeFile)('import-error.log', log).then(exit, exit);
};
exports.logAndExit = logAndExit;
const processAll = (getterFn, service, request, processor = (x) => x) => {
    const limit = 100;
    const recur = (result, getterFn, service, goOn, lastId, total) => {
        if (!goOn) {
            return result;
        }
        let uriBuilder = typeof service === 'function'
            ? service()
            : service
                .perPage(limit)
                .sort('id', true)
                .withTotal(total === undefined);
        if (lastId) {
            uriBuilder = uriBuilder.where(`id>"${lastId}"`);
        }
        const uri = uriBuilder.build();
        return getterFn(Object.assign(Object.assign({}, request), { uri })).then((response) => {
            return Promise.all(response.body.results.map((item) => processor(item, total || response.body.total))).then((processed) => {
                var _a;
                const all = result.concat(processed);
                return recur(all, getterFn, service, response.body.count === limit, (_a = response.body.results.slice(-1)[0]) === null || _a === void 0 ? void 0 : _a.id, total || response.body.total);
            });
        });
    };
    return recur([], getterFn, service, true);
};
exports.processAll = processAll;
// const processWithNotify = (
//   message: string,
//   getterFn: Function,
//   service: any,
//   request: any,
//   processor: (x: any, total: number) => any = (x) => x
// ): Promise<any[]> => {
//   // let notify = { stop: (x: any = undefined) => x }; // Default value for x is undefined
//   // let notify = {
//   //   start: (total: number) => { /* your implementation */ },
//   //   stop: (x: any) => x,
//   //   update: (done: number) => { /* your implementation */ },
//   // };
//   let notify = { stop: (x: any) => x };
//   let started = false;
//   const updateStatus = (done: number, total: number): void => {
//     if (!started) {
//       notify = new SingleBar(
//         {
//           format: message,
//           barCompleteChar: '\u2588',
//           barIncompleteChar: '\u2591',
//         },
//         Presets.rect
//       );
//       notify.start(total);
//       started = true;
//     }
//     notify.stop(done);
//   };
//   let processed = 0;
//   return processAll(
//     getterFn,
//     service,
//     request,
//     (current, total) =>
//       Promise.resolve()
//         .then(() => processor(current, total))
//         .then((result) => {
//           updateStatus(++processed, total);
//           return result;
//         })
//   ).then(
//     (result) => {
//       notify.stop(undefined);
//       return result;
//     },
//     (err) => {
//       notify.stop(undefined);  // Provide the expected argument
//       return Promise.reject(err);
//     }
//   );
// };
const processWithNotify = (message, getterFn, service, request, processor = (x) => x) => {
    // Initialize notify as an instance of SingleBar
    let notify = null;
    let started = false;
    // Update the status of the progress bar
    const updateStatus = (done, total) => {
        if (!started) {
            // Instantiate notify when starting the process
            notify = new cli_progress_1.SingleBar({
                format: message,
                barCompleteChar: '\u2588', // Unicode block character for completed bar
                barIncompleteChar: '\u2591', // Unicode block character for incomplete bar
            }, cli_progress_1.Presets.rect // Use the rectangular style preset
            );
            notify.start(total, 0); // Start the progress bar with a total value
            started = true;
        }
        if (notify) {
            notify.update(done); // Update the progress bar with the current progress
        }
    };
    let processed = 0;
    // Process all items
    return (0, exports.processAll)(getterFn, service, request, (current, total) => Promise.resolve()
        .then(() => processor(current, total))
        .then((result) => {
        updateStatus(++processed, total); // Update progress bar after processing
        return result;
    })).then((result) => {
        if (notify) {
            notify.stop(); // Stop the progress bar once processing is done
        }
        return result;
    }, (err) => {
        if (notify) {
            notify.stop(); // Stop the progress bar in case of an error
        }
        return Promise.reject(err); // Reject the promise with the error
    });
};
const createStandardDelete = ({ itemName, service, deleteFunction = (item) => (0, exports.execute)({
    uri: (typeof service === 'function' ? service() : service)
        .byId(item.id)
        .withVersion(item.version)
        .build(),
    method: 'DELETE',
}), }) => () => {
    // eslint-disable-next-line no-console
    console.log('\x1b[32m%s\x1b[0m', `Deleting ${itemName}`);
    const spaces = (amount) => [...new Array(amount)].map(() => ' ').join('');
    return processWithNotify(`Delete ${itemName}${spaces(20 - itemName.length)}{bar} |` + '| {percentage}% || {value}/{total} items', exports.execute, service, {
        method: 'GET',
    }, deleteFunction).catch((err) => (0, exports.logAndExit)(err, `Failed to delete ${itemName}`));
};
exports.createStandardDelete = createStandardDelete;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0RBQTZDO0FBQzdDLCtDQUFrRDtBQUNsRCx1Q0FBeUI7QUFFekIsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDM0UsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3hELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQztBQUUxQyxNQUFNLEtBQUssR0FBRyxDQUFDLE9BQWUsRUFBRSxLQUFXLEVBQWdCLEVBQUUsQ0FDbEUsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUN0QixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUMxQyxDQUFDO0FBSFMsUUFBQSxLQUFLLFNBR2Q7QUFFSixNQUFNLFdBQVcsR0FBRyxDQUFDLENBQU0sRUFBcUIsRUFBRSxDQUNoRCxDQUFDLEtBQUssU0FBUyxJQUFJLE9BQU8sQ0FBQyxDQUFDLElBQUksS0FBSyxVQUFVLENBQUM7QUFFbEQsTUFBTSxTQUFTLEdBQUcsQ0FBSSxFQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQWlCLEVBQU8sRUFBRSxDQUNyRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUUvQixNQUFNLGFBQWEsR0FB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