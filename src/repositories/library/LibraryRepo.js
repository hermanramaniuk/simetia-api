"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryRepo = void 0;
const connection_1 = __importDefault(require("../../database/connection"));
const HttpException_1 = __importDefault(require("../../error/HttpException"));
class LibraryRepo {
    async getAllBooks() {
        const books = await connection_1.default('library').select('*').catch((err) => {
            throw new Error(err.detail);
        });
        return books;
    }
    async save(t) {
        const book = await connection_1.default('library').insert({
            bookName: t.bookName,
            bookSummary: t.bookSummary,
            isDelete: 0,
            createdAt: new Date().toLocaleString(),
        }).returning('id').then(async (id_library) => {
            const bookInserted = await this.getBookById(id_library[0]);
            return bookInserted;
        }).catch((err) => {
            console.log("err", err);
            throw new HttpException_1.default(400, err.detail, '');
        });
        return book;
    }
    async getBookById(id) {
        const book = await connection_1.default('library').select('*').where({ id: id })
            .catch((err) => {
            throw new Error(err.detail);
        });
        return book[0];
    }
    async delete(id) {
        const book = await connection_1.default('library').select('*').where({ id: id }).del().catch((err) => {
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
exports.LibraryRepo = LibraryRepo;
