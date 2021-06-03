import Library from "../../models/Library";
import db from '../../database/connection';
import { LibraryIRepo } from "./LibraryIRepo";
import HttpException from "../../error/HttpException";

export class LibraryRepo implements LibraryIRepo {

    public async getAllBooks () {
        const books = await db('library').select('*').catch((err) => {
            throw new Error(err.detail);
        });

        return books;
    }

    public async save(t: Library): Promise<any> {
        const book = await db('library').insert({
            bookName: t.bookName,
            bookSummary: t.bookSummary,
            isDelete: 0,
            createdAt: new Date().toLocaleString(),
        }).returning('id').then(async (id_library) => {
            const bookInserted = await this.getBookById(id_library[0]);
            return bookInserted;
        }).catch((err) => {
            console.log("err", err);
            throw new HttpException(400, err.detail, '');
        });

        return book;
    }

    public async getBookById(id: string): Promise<Library> {
        const book = await db('library').select('*').where({ id: id })
        .catch((err) => {
            throw new Error(err.detail);
        });

        return book[0];
    }

    public async delete(id: number): Promise<any> {
        const book = await db('library').select('*').where({ id: id }).del().catch((err) => {
            throw new Error(err.detail);
        });

        return 'success';
    }

    exists(t: Library): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async update(t: Library, id: string): Promise<any> {
    }
}