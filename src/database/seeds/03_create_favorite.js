"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    await knex('favorite').insert([
        {
            id: '1',
            userId: '1',
            bookId: '3',
            createdAt: '2020-10-10 10:00:00',
            isDelete: '0',
        }
    ]);
}
exports.seed = seed;
