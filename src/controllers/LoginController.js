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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = __importStar(require("../authentication/jwt"));
const HttpException_1 = __importDefault(require("../error/HttpException"));
class LoginController {
    constructor(usersRepo, userMapper) {
        this.login = async (request, response, next) => {
            const body = request.body;
            const email = body.email;
            const password = body.password;
            // const [, hash] = request.headers.authorization.split(' ');
            // const [email, password] = Buffer.from(hash, 'base64').toString().split(":")
            if (email === undefined || password === undefined) {
                return response.status(401).send("Unauthorized");
            }
            try {
                const user = await this.usersRepo.getUserByCondition({ "email": email });
                if (!user) {
                    return response.status(401).send("Unauthorized");
                }
                let passwordIsCorrect = await bcrypt_1.default.compare(password, user.password);
                if (!passwordIsCorrect) {
                    return response.status(401).send("Unauthorized");
                }
                const token = await jwt.sign({ user: user.id });
                return response.status(200).send({ user, token });
            }
            catch (err) {
                next(new HttpException_1.default(500, err.message || 'Unexpected error', ''));
            }
        };
        this.usersRepo = usersRepo;
        this.userMapper = userMapper;
    }
}
exports.default = LoginController;
