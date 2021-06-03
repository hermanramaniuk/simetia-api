"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('favorite', table => {
        table.increments('id').primary();
        table.integer('userId').notNullable();
        table.integer('bookId').notNullable();
        table.timestamp('createdAt').notNullable();
        table.integer('isDelete').notNullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('usergroup');
}
exports.down = down;
