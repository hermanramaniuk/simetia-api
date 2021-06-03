import moment from 'moment';
import FavoriteInput from '../models/FavoriteInput';
import Favorite from '../models/Favorite';
import { Mapper } from './Mapper';

export class FavoriteMapper implements Mapper<Favorite, FavoriteInput> {

    constructor() {}

    toDTO(favorite: any): any {
        const favoriteModel  = {
            id : favorite.id,
            userId : favorite.userId,
            bookId: favorite.bookId,
        };
        return favoriteModel;
    }

    toPersistence(favoriteInput: FavoriteInput): Favorite {
        const favorite = new Favorite();
        favorite.userId = favoriteInput.userId,
        favorite.bookId = favoriteInput.bookId;
        favorite.createdAt = moment().format();
        return favorite;
    }

}