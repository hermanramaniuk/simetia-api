import Favorite from "../../models/Favorite";

export interface FavoriteIRepo extends Repo<Favorite> {
    findAllFavorites(): Promise<Favorite[]>;
}