"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryMapper = void 0;
const moment_1 = __importDefault(require("moment"));
const Library_1 = __importDefault(require("../models/Library"));
class LibraryMapper {
    constructor() { }
    toDTO(book) {
        const bookModel = {
            id: book.id,
            bookName: book.bookName,
            bookSummary: book.bookSummary,
        };
        return bookModel;
    }
    toPersistence(libraryInput) {
        const book = new Library_1.default();
        book.bookName = libraryInput.bookName,
            book.bookSummary = libraryInput.bookSummary;
        book.createdAt = moment_1.default().format();
        return book;
    }
}
exports.LibraryMapper = LibraryMapper;
