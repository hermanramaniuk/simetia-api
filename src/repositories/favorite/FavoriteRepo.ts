import Favorite from "../../models/Favorite";
import db from '../../database/connection';
import { FavoriteIRepo } from "./FavoriteIRepo";
import HttpException from "../../error/HttpException";

export class FavoriteRepo implements FavoriteIRepo {

    public async findAllFavorites () {
        const books = await db('favorite').select('*').catch((err) => {
            throw new Error(err.detail);
        });

        return books;
    }

    public async save(t: Favorite): Promise<any> {
        const favorite = await db('favorite').insert({
            userId: t.userId,
            bookId: t.bookId,
            isDelete: 0,
            createdAt: new Date().toLocaleString(),
        }).returning('id').then(async (id_library) => {
            const favoriteInserted = await this.getFavoriteById(id_library[0]);
            return favoriteInserted;
        }).catch((err) => {
            throw new HttpException(400, err.detail, '');
        });
        return favorite;
    }

    public async getFavoriteById(id: string): Promise<Favorite> {
        const favorite = await db('favorite').select('*').where({ id: id })
        .catch((err) => {
            throw new Error(err.detail);
        });

        return favorite[0];
    }

    public async getFavoriteId(favorite: Favorite): Promise<any> {
        const ids = await db('favorite').select('id').where({ userId: favorite.userId, bookId: favorite.bookId })
        .catch((err) => {
            console.log("getfavoriteerror", err.detail);
            throw new Error(err.detail);
        });
        console.log("getfavoriteId", ids);

        return ids[0].id;
    }

    public async delete(id: String): Promise<any> {
        const favorite = await db('favorite').select('*').where({ id: id }).del().catch((err) => {
            throw new Error(err.detail);
        });

        return 'success';
    }

    exists(t: Favorite): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async update(t: Favorite, id: string): Promise<any> {
    }
}