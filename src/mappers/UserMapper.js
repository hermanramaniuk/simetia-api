"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const moment_1 = __importDefault(require("moment"));
const User_1 = __importDefault(require("./../models/User"));
class UserMapper {
    constructor() { }
    toDTO(user) {
        const userModel = {
            id: user.id,
            name: user.name,
            role: user.role,
            email: user.email,
            password: user.password,
        };
        return userModel;
    }
    toPersistence(userInput) {
        const user = new User_1.default();
        user.name = userInput.name,
            user.email = userInput.email;
        user.password = userInput.password;
        user.createdAt = moment_1.default().format();
        return user;
    }
}
exports.UserMapper = UserMapper;
