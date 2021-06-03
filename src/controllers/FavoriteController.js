"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = __importDefault(require("../error/HttpException"));
class FavoiteController {
    constructor(favoriteRepo, favoriteMapper) {
        this.addBook2Favorite = async (request, response, next) => {
            const body = request.body;
            if (body) {
                try {
                    const favorite = await this.favoriteRepo.save(this.favoriteMapper.toPersistence(body));
                    return response.status(200).json(favorite);
                }
                catch (err) {
                    next(new HttpException_1.default(err.status || 500, err.message || 'Unexpected error add favorite', ''));
                }
            }
        };
        this.removeBook2Favorite = async (request, response, next) => {
            const body = request.body;
            if (body) {
                try {
                    const favorite = await this.favoriteRepo.delete(body.id);
                    return response.status(200).json(favorite);
                }
                catch (err) {
                    next(new HttpException_1.default(err.status || 500, err.message || 'Unexpected error remove favorite', ''));
                }
            }
        };
        this.getAllFavorites = async (request, response, next) => {
            try {
                const books = await this.favoriteRepo.findAllFavorites();
                return response.status(200).json(books);
            }
            catch (err) {
                next(new HttpException_1.default(err.status || 500, err.message || 'Unexpected error remove library', ''));
            }
        };
        this.favoriteRepo = favoriteRepo;
        this.favoriteMapper = favoriteMapper;
    }
}
exports.default = FavoiteController;
