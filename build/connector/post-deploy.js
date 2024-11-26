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
function postDeploy(properties) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiRoot = (0, create_client_1.createApiRoot)();
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const properties = new Map(Object.entries(process.env));
            yield postDeploy(properties);
        }
        catch (error) {
            process.stderr.write(`Post-deploy failed: ${error.message}\n`);
            process.exitCode = 1;
        }
    });
}
run();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC1kZXBsb3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29ubmVjdG9yL3Bvc3QtZGVwbG95LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkRBQXdEO0FBRXhELFNBQWUsVUFBVSxDQUFDLFVBQWU7O1FBQ3ZDLE1BQU0sT0FBTyxHQUFHLElBQUEsNkJBQWEsR0FBRSxDQUFDO0lBQ2xDLENBQUM7Q0FBQTtBQUVELFNBQWUsR0FBRzs7UUFDaEIsSUFBSSxDQUFDO1lBQ0gsTUFBTSxVQUFVLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN4RCxNQUFNLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztZQUNwQixPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsS0FBSyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7WUFDL0QsT0FBTyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDdkIsQ0FBQztJQUNILENBQUM7Q0FBQTtBQUVELEdBQUcsRUFBRSxDQUFDIn0=