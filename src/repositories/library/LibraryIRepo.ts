import Library from "../../models/Library";

export interface LibraryIRepo extends Repo<Library> {
    getAllBooks(): Promise<Library[]>;
}