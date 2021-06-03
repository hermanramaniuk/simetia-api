"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LoginController_1 = __importDefault(require("./controllers/LoginController"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const LibraryController_1 = __importDefault(require("./controllers/LibraryController"));
const FavoriteController_1 = __importDefault(require("./controllers/FavoriteController"));
const UsersRepo_1 = require("./repositories/users/UsersRepo");
const LibraryRepo_1 = require("./repositories/library/LibraryRepo");
const FavoriteRepo_1 = require("./repositories/favorite/FavoriteRepo");
const UserInput_1 = __importDefault(require("./models/UserInput"));
const LibraryInput_1 = __importDefault(require("./models/LibraryInput"));
const FavoriteInput_1 = __importDefault(require("./models/FavoriteInput"));
const UserMapper_1 = require("./mappers/UserMapper");
const LibraryMapper_1 = require("./mappers/LibraryMapper");
const FavoriteMapper_1 = require("./mappers/FavoriteMapper");
const ValidationMiddleware_1 = require("./error/ValidationMiddleware");
const routes = express_1.default.Router();
const userController = new UserController_1.default(new UsersRepo_1.UsersRepo, new UserMapper_1.UserMapper());
const loginController = new LoginController_1.default(new UsersRepo_1.UsersRepo, new UserMapper_1.UserMapper());
const libraryController = new LibraryController_1.default(new LibraryRepo_1.LibraryRepo, new LibraryMapper_1.LibraryMapper());
const favoriteController = new FavoriteController_1.default(new FavoriteRepo_1.FavoriteRepo, new FavoriteMapper_1.FavoriteMapper());
// @route   POST api/register
// @desc    Register new user
// @access  Public
routes.post('/api/register', ValidationMiddleware_1.validationMiddleware(UserInput_1.default), userController.create);
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
routes.post('/api/book', ValidationMiddleware_1.authenticateMiddleware, ValidationMiddleware_1.validationMiddleware(LibraryInput_1.default), libraryController.addBook2Library);
// @route   DELETE api/book
// @desc    Delete book from the library
// @access  Private
routes.delete('/api/book', ValidationMiddleware_1.authenticateMiddleware, libraryController.removeBook2Library);
// @route   GET api/favorite
// @desc    Get All Favorite booklist from favorites
// @access  Private
routes.get('/api/favorite', ValidationMiddleware_1.authenticateMiddleware, favoriteController.getAllFavorites);
// @route   POST api/book
// @desc    Add book to the favorites
// @access  Private
routes.post('/api/favorite', ValidationMiddleware_1.authenticateMiddleware, ValidationMiddleware_1.validationMiddleware(FavoriteInput_1.default), favoriteController.addBook2Favorite);
// @route   DELETE api/book
// @desc    Delete book from favorites
// @access  Private
routes.delete('/api/favorite', ValidationMiddleware_1.authenticateMiddleware, favoriteController.removeBook2Favorite);
exports.default = routes;
