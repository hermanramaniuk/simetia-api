import express from 'express';
import LoginController from './controllers/LoginController';
import UserController from './controllers/UserController';
import LibraryController from './controllers/LibraryController';
import FavoriteController from './controllers/FavoriteController';

import { UsersRepo } from './repositories/users/UsersRepo';
import { LibraryRepo } from './repositories/library/LibraryRepo';
import { FavoriteRepo } from './repositories/favorite/FavoriteRepo';

import UserInput from './models/UserInput';
import LibraryInput from './models/LibraryInput';
import FavoriteInput from './models/FavoriteInput';

import { UserMapper } from './mappers/UserMapper';
import { LibraryMapper } from './mappers/LibraryMapper';
import { FavoriteMapper } from './mappers/FavoriteMapper';


import { authenticateMiddleware, validationMiddleware } from './error/ValidationMiddleware';

const routes = express.Router();

const userController = new UserController(new UsersRepo, new UserMapper());
const loginController = new LoginController(new UsersRepo, new UserMapper());
const libraryController = new LibraryController(new LibraryRepo, new LibraryMapper());
const favoriteController = new FavoriteController(new FavoriteRepo, new FavoriteMapper());

// @route   POST api/register
// @desc    Register new user
// @access  Public
routes.post('/api/register', validationMiddleware(UserInput), userController.create);

// @route   POST api/login
// @desc    Login user
// @access  Public
routes.post('/api/login', loginController.login);

// @route   GET api/book
// @desc    Get all book list
// @access  Public
routes.get('/api/book', libraryController.getAllBooks);

// @route   POST api/book
// @desc    Register book to the library
// @access  Private
routes.post('/api/book', authenticateMiddleware, validationMiddleware(LibraryInput), libraryController.addBook2Library);

// @route   DELETE api/book
// @desc    Delete book from the library
// @access  Private
routes.delete('/api/book', authenticateMiddleware, libraryController.removeBook2Library);

// @route   GET api/favorite
// @desc    Get All Favorite booklist from favorites
// @access  Private
routes.get('/api/favorite', authenticateMiddleware, favoriteController.getAllFavorites);

// @route   POST api/book
// @desc    Add book to the favorites
// @access  Private
routes.post('/api/favorite', authenticateMiddleware, validationMiddleware(FavoriteInput), favoriteController.addBook2Favorite);

// @route   DELETE api/book
// @desc    Delete book from favorites
// @access  Private
routes.delete('/api/favorite', authenticateMiddleware, favoriteController.removeBook2Favorite);


export default routes;
