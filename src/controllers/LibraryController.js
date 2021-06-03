"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = __importDefault(require("../error/HttpException"));
class LibraryController {
    constructor(libraryRepo, libraryMapper) {
        this.addBook2Library = async (request, response, next) => {
            const body = request.body;
            const role = request.body.user.role;
            if (role === 'ADMIN') {
                if (body) {
                    try {
                        const library = await this.libraryRepo.save(this.libraryMapper.toPersistence(body));
                        return response.status(200).json(library);
                    }
                    catch (err) {
                        next(new HttpException_1.default(err.status || 500, err.message || 'Unexpected error add library', ''));
                    }
                }
            }
            else {
                return response.status(200).json("You don't have permission, User cannot add, Admin can only add");
            }
        };
        this.removeBook2Library = async (request, response, next) => {
            const body = request.body;
            if (body) {
                try {
                    const library = await this.libraryRepo.delete(body.id);
                    return response.status(200).json(library);
                }
                catch (err) {
                    next(new HttpException_1.default(err.status || 500, err.message || 'Unexpected error remove library', ''));
                }
            }
        };
        this.getAllBooks = async (request, response, next) => {
            try {
                const books = await this.libraryRepo.getAllBooks();
                return response.status(200).json(books);
            }
            catch (err) {
                next(new HttpException_1.default(err.status || 500, err.message || 'Unexpected error remove library', ''));
            }
        };
        this.libraryRepo = libraryRepo;
        this.libraryMapper = libraryMapper;
    }
}
exports.default = LibraryController;
