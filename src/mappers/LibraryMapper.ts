import moment from 'moment';
import LibraryInput from '../models/LibraryInput';
import Library from '../models/Library';
import { Mapper } from './Mapper';

export class LibraryMapper implements Mapper<Library, LibraryInput> {

    constructor() {}

    toDTO(book: any): any {
        const bookModel  = {
            id : book.id,
            bookName : book.bookName,
            bookSummary: book.bookSummary,
        };
        return bookModel;
    }

    toPersistence(libraryInput: LibraryInput): Library {
        const book = new Library();
        book.bookName = libraryInput.bookName,
        book.bookSummary = libraryInput.bookSummary;
        book.createdAt = moment().format();
        return book;
    }

}