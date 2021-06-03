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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = exports.authenticateMiddleware = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const HttpException_1 = __importDefault(require(".//HttpException"));
const jwt = __importStar(require("../authentication/jwt"));
const UsersRepo_1 = require("../repositories/users/UsersRepo");
const userRepo = new UsersRepo_1.UsersRepo();
exports.authenticateMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        const payload = await jwt.verify(token);
        const userid = payload.user;
        let user;
        user = await userRepo.getUserByCondition({ id: userid });
        if (!user) {
            next(new HttpException_1.default(401, "Unauthorized", ''));
        }
        req.body.user = user;
        next();
    }
    catch (error) {
        next(new HttpException_1.default(401, error, ''));
    }
};
function validationMiddleware(type) {
    return async (req, res, next) => {
        class_validator_1.validate(class_transformer_1.plainToClass(type, req.body))
            .then(async (errors) => {
            if (errors.length > 0) {
                console.log("errors: ", errors);
                next(new HttpException_1.default(401, "Error occured", ''));
            }
            else {
                next();
            }
        });
    };
}
exports.validationMiddleware = validationMiddleware;
