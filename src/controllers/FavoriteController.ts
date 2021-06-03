import { Response, Request, NextFunction } from 'express';
import HttpException from '../error/HttpException';
import { FavoriteRepo } from './../repositories/favorite/FavoriteRepo';
import { FavoriteMapper } from '../mappers/FavoriteMapper';

export default class FavoiteController {

    favoriteRepo: FavoriteRepo;
    favoriteMapper: FavoriteMapper;

    constructor(favoriteRepo: FavoriteRepo, favoriteMapper: FavoriteMapper) {
        this.favoriteRepo = favoriteRepo;
        this.favoriteMapper = favoriteMapper;
    }

    public addBook2Favorite = async(request: Request, response: Response, next: NextFunction) => {
        const body = request.body;

        if (body) {
            try {
                const favorite = await this.favoriteRepo.save(this.favoriteMapper.toPersistence(body));
                return response.status(200).json(favorite);
            } catch (err) {
                next(new HttpException(err.status || 500, err.message || 'Unexpected error add favorite', ''));
            }
        }
    }

    public removeBook2Favorite = async(request: Request, response: Response, next: NextFunction) => {
        const body = request.body;

        if (body) {
            try {
                const favorite = await this.favoriteRepo.delete(body.id);
                return response.status(200).json(favorite);
            } catch (err) {
                next(new HttpException(err.status || 500, err.message || 'Unexpected error remove favorite', ''));
            }
        }
    }

    public getAllFavorites = async(request: Request, response: Response, next: NextFunction) => {
        try {
            const books = await this.favoriteRepo.findAllFavorites();
            return response.status(200).json(books);
        } catch (err) {
            next(new HttpException(err.status || 500, err.message || 'Unexpected error remove library', ''));
        }
    }
}
