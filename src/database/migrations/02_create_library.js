"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('library', table => {
        table.increments('id');
        table.string('bookName').notNullable();
        table.string('bookSummary').notNullable();
        table.timestamp('createdAt').notNullable();
        table.integer('isDelete').notNullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('local');
}
exports.down = down;
