"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteMapper = void 0;
const moment_1 = __importDefault(require("moment"));
const Favorite_1 = __importDefault(require("../models/Favorite"));
class FavoriteMapper {
    constructor() { }
    toDTO(favorite) {
        const favoriteModel = {
            id: favorite.id,
            userId: favorite.userId,
            bookId: favorite.bookId,
        };
        return favoriteModel;
    }
    toPersistence(favoriteInput) {
        const favorite = new Favorite_1.default();
        favorite.userId = favoriteInput.userId,
            favorite.bookId = favoriteInput.bookId;
        favorite.createdAt = moment_1.default().format();
        return favorite;
    }
}
exports.FavoriteMapper = FavoriteMapper;
