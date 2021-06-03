// import bcrypt from 'bcrypt';
import { Response, Request, NextFunction } from 'express';
import HttpException from '../error/HttpException';
import { LibraryRepo } from './../repositories/library/LibraryRepo';
import { LibraryMapper } from '../mappers/LibraryMapper';

export default class LibraryController {

    libraryRepo: LibraryRepo;
    libraryMapper: LibraryMapper;

    constructor(libraryRepo: LibraryRepo, libraryMapper: LibraryMapper) {
        this.libraryRepo = libraryRepo;
        this.libraryMapper = libraryMapper;
    }

    public addBook2Library = async(request: Request, response: Response, next: NextFunction) => {
        const body = request.body;
        const role = request.body.auth.role;
        
        if (role === 'ADMIN') {
            if (body) {
                try {
                    const library = await this.libraryRepo.save(this.libraryMapper.toPersistence(body));
                    return response.status(200).json(library);
                } catch (err) {
                    next(new HttpException(err.status || 500, err.message || 'Unexpected error add library', ''));
                }
            }            
        } else {
            return response.status(400).json("You don't have permission");
        }
    }

    public removeBook2Library = async(request: Request, response: Response, next: NextFunction) => {
        const body = request.body;

        if (body) {
            try {
                const library = await this.libraryRepo.delete(body.id);
                return response.status(200).json(library);
            } catch (err) {
                next(new HttpException(err.status || 500, err.message || 'Unexpected error remove library', ''));
            }
        }
    }

    public getAllBooks = async(request: Request, response: Response, next: NextFunction) => {
        try {
            const books = await this.libraryRepo.getAllBooks();
            return response.status(200).json(books);
        } catch (err) {
            next(new HttpException(err.status || 500, err.message || 'Unexpected error remove library', ''));
        }
    }
}
