"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const HttpException_1 = __importDefault(require("../error/HttpException"));
class UserController {
    constructor(usersRepo, userMapper) {
        this.getAll = async (request, response, next) => {
            const { id } = request.params;
            if (id) {
                try {
                    await this.usersRepo.getUserById(id).then((resp) => {
                        return response.status(200).json(this.userMapper.toDTO(resp));
                    });
                }
                catch (err) {
                    next(new HttpException_1.default(500, 'Unexpected error getting user', err.sqlMessage));
                }
            }
            else {
                try {
                    await this.usersRepo.findAllUsers().then((resp) => {
                        const format = resp.map((element) => {
                            return this.userMapper.toDTO(element);
                        });
                        return response.status(200).json(format);
                    });
                }
                catch (err) {
                    next(new HttpException_1.default(500, 'Unexpected error getting users', err.sqlMessage));
                }
            }
        };
        this.create = async (request, response, next) => {
            const body = request.body.user;
            if (body) {
                try {
                    let salt = await bcrypt_1.default.genSalt(10);
                    body.password = await bcrypt_1.default.hash(body.password, salt);
                    const user = await this.usersRepo.save(this.userMapper.toPersistence(body));
                    return response.status(201).json(user);
                }
                catch (err) {
                    next(new HttpException_1.default(err.status || 500, err.message || 'Unexpected error creating user', ''));
                }
            }
        };
        this.delete = async (request, response, next) => {
            const { id } = request.params;
            if (id) {
                try {
                    const user = await this.usersRepo.delete(id);
                    return response.status(204).send();
                }
                catch (err) {
                    next(new HttpException_1.default(500, err.message || 'Unexpected error deleting user', ''));
                }
            }
            else {
                next(new HttpException_1.default(404, 'Method not found', ''));
            }
        };
        this.update = async (request, response, next) => {
            const { id } = request.params;
            const body = request.body;
            if (body && id) {
                try {
                    const user = await this.usersRepo.update(this.userMapper.toPersistence(body), id);
                    return response.status(200).json(this.userMapper.toDTO(user));
                }
                catch (err) {
                    next(new HttpException_1.default(500, err.message || 'Unexpected error updating user', ''));
                }
            }
            else {
                next(new HttpException_1.default(404, 'Method not found', ''));
            }
        };
        this.getActivities = async (request, response, next) => {
            const { username } = request.params;
            var { size } = request.query;
            if (!size) {
                size = '1';
            }
            try {
                const activities = await this.usersRepo.getUserActivities(username, parseInt(size.toString()));
                return response.status(200).json(activities);
            }
            catch (err) {
                next(new HttpException_1.default(500, err.message || 'Unexpected error getting user activities', ''));
            }
            return response.status(200).send('');
        };
        this.getUserLastPlaces = async (request, response, next) => {
            const { username } = request.params;
            var { size } = request.query;
            if (!size) {
                size = '1';
            }
            try {
                const activities = await this.usersRepo.getUserLastPlacesPassed(username, parseInt(size.toString()));
                return response.status(200).json(activities);
            }
            catch (err) {
                next(new HttpException_1.default(500, err.message || 'Unexpected error getting user last places', ''));
            }
            return response.status(200).send('');
        };
        this.usersRepo = usersRepo;
        this.userMapper = userMapper;
    }
}
exports.default = UserController;
