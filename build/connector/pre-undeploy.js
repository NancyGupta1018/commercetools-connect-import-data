"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_client_1 = require("../client/create.client");
function preUndeploy() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiRoot = (0, create_client_1.createApiRoot)();
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield preUndeploy();
        }
        catch (error) {
            process.stderr.write(`Pre-undeploy failed: ${error.message}\n`);
            process.exitCode = 1;
        }
    });
}
run();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlLXVuZGVwbG95LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Nvbm5lY3Rvci9wcmUtdW5kZXBsb3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyREFBd0Q7QUFFeEQsU0FBZSxXQUFXOztRQUN4QixNQUFNLE9BQU8sR0FBRyxJQUFBLDZCQUFhLEdBQUUsQ0FBQztJQUNsQyxDQUFDO0NBQUE7QUFFRCxTQUFlLEdBQUc7O1FBQ2hCLElBQUksQ0FBQztZQUNILE1BQU0sV0FBVyxFQUFFLENBQUM7UUFDdEIsQ0FBQztRQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7WUFDcEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEtBQUssQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO1lBQ2hFLE9BQU8sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7SUFDSCxDQUFDO0NBQUE7QUFFRCxHQUFHLEVBQUUsQ0FBQyJ9