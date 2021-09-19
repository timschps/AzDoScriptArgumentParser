"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var tl = __importStar(require("azure-pipelines-task-lib/task"));
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var variableName, variableNameInTool, parsedArgumentListName, variableBinder, optionalDefaultValue, parsedArguments, variableValue, spacer, binder;
        return __generator(this, function (_a) {
            try {
                variableName = tl.getInput('VariableName', true);
                variableNameInTool = tl.getInput('VariableNameInTool', true);
                parsedArgumentListName = tl.getInput('ParsedArgumentListName', true);
                variableBinder = tl.getInput('VariableBinder');
                optionalDefaultValue = tl.getInput('DefaultValue');
                parsedArguments = tl.getVariable(parsedArgumentListName);
                console.log("-----------------------------------------------------");
                console.log("This task allows you to build an argument list for a script in this build. " +
                    "You can specify (optional) variables that can be passed to the build and that " +
                    "can be parsed to the argumentlist that you can specify in the variable 'ParsedArgumentListName' of this task");
                console.log("This task will try to retreive a value for variable: '" + variableName + "'");
                console.log("This variable (if it exists in the build definition) will then be used for the script variable: '" + variableNameInTool + "' ");
                console.log("And it will be parsed in into the argument list with variable name: '" + parsedArgumentListName + "'");
                console.log("So, if you want to modify an optional script argument in the script you are going to call, " +
                    (" then all you need to do is to specify a build variable (with name " + variableName + "\") and give it a value!"));
                console.log("-----------------------------------------------------");
                if (parsedArguments !== undefined && parsedArguments) {
                    console.log("The the argumentlist (possibly retrieved from previous task) is: '" + parsedArguments + "'");
                }
                else {
                    console.log("The argumentlist seems to be empty at the moment, I'll start from scratch!");
                }
                console.log("Progress: Checking if variable '" + variableName + "' has been specified in the build variables");
                variableValue = process.env[variableName];
                if (!(variableValue !== undefined && variableValue) && (optionalDefaultValue !== undefined && optionalDefaultValue)) {
                    console.log("There was no variable with name " + variableName + " specified in the pipeline, but there is a defaultvalue " + optionalDefaultValue);
                    console.log("  -> So working with this value");
                    variableValue = optionalDefaultValue;
                }
                if (variableValue !== undefined && variableValue) {
                    console.log("Progress: Variable with name '" + variableName + "' specified on buildlevel (The value is: " + variableValue + "), " +
                        "adding this value to the argumentstring");
                    spacer = "";
                    if (parsedArguments !== undefined && parsedArguments) {
                        spacer = " ";
                    }
                    if (parsedArguments === undefined) {
                        parsedArguments = "";
                    }
                    binder = (variableBinder !== undefined && variableBinder) ? variableBinder : " ";
                    parsedArguments = parsedArguments + spacer + "-" + variableNameInTool + binder + "\"" + variableValue + "\"";
                    tl.setVariable(parsedArgumentListName, parsedArguments);
                    console.log("Progress: The result of this change is now: " + parsedArguments);
                }
                else {
                    console.log("Progress: no variable with name '" + variableName + "' specified on buildlevel, doing nothing");
                }
                console.log("-----------------------------------------------------");
                console.log("Here is a resume of what I found/did:");
                console.log("I had to look for a build variable with name: " + variableName);
                console.log("I had to use it in the script argument list (" + parsedArgumentListName + ")");
                if (variableValue !== undefined && variableValue) {
                    console.log("I found the variable (" + variableName + ") and it had the following value: " + variableValue);
                    console.log("It is used in the argument list (" + parsedArgumentListName + ") and this is the result: " + parsedArguments);
                }
                else {
                    console.log("The variable was not defined (or it had no value), so I have nothing more to report here");
                }
                console.log("-----------------------------------------------------");
            }
            catch (err) {
                if (err instanceof Error) {
                    tl.setResult(tl.TaskResult.Failed, err.message);
                }
                else {
                    tl.setResult(tl.TaskResult.Failed, "Unknown error occurs");
                }
            }
            return [2 /*return*/];
        });
    });
}
run();
