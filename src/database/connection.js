"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const db = knex_1.default({
    client: 'pg',
    connection: {
        host: 'batyr.db.elephantsql.com',
        user: 'gfewvidg',
        password: 'P67A_Ei91pk40SmPe6dquOlhPOyyF0Gd',
        database: 'gfewvidg'
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }
});
exports.default = db;
