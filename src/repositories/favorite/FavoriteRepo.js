"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteRepo = void 0;
const connection_1 = __importDefault(require("../../database/connection"));
const HttpException_1 = __importDefault(require("../../error/HttpException"));
class FavoriteRepo {
    async findAllFavorites() {
        const books = await connection_1.default('favorite').select('*').catch((err) => {
            throw new Error(err.detail);
        });
        return books;
    }
    async save(t) {
        const favorite = await connection_1.default('favorite').insert({
            userId: t.userId,
            bookId: t.bookId,
            isDelete: 0,
            createdAt: new Date().toLocaleString(),
        }).returning('id').then(async (id_library) => {
            const favoriteInserted = await this.getFavoriteById(id_library[0]);
            return favoriteInserted;
        }).catch((err) => {
            throw new HttpException_1.default(400, err.detail, '');
        });
        return favorite;
    }
    async getFavoriteById(id) {
        const favorite = await connection_1.default('favorite').select('*').where({ id: id })
            .catch((err) => {
            throw new Error(err.detail);
        });
        return favorite[0];
    }
    async getFavoriteId(favorite) {
        const ids = await connection_1.default('favorite').select('id').where({ userId: favorite.userId, bookId: favorite.bookId })
            .catch((err) => {
            console.log("getfavoriteerror", err.detail);
            throw new Error(err.detail);
        });
        console.log("getfavoriteId", ids);
        return ids[0].id;
    }
    async delete(id) {
        const favorite = await connection_1.default('favorite').select('*').where({ id: id }).del().catch((err) => {
            throw new Error(err.detail);
        });
        return 'success';
    }
    exists(t) {
        throw new Error("Method not implemented.");
    }
    async update(t, id) {
    }
}
exports.FavoriteRepo = FavoriteRepo;
