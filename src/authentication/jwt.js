"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.sign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = "$2y$12$M4z9XReZpu1T2i98Rl9gCevfrGd95aDpcwkh6zUzj00PESY13LAd2";
exports.sign = async (payload) => {
    return await jsonwebtoken_1.default.sign(payload, secret, { expiresIn: 7200 });
};
exports.verify = async (token) => {
    return await jsonwebtoken_1.default.verify(token, secret);
};
