"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('user', table => {
        table.increments('id');
        table.string('name').notNullable().unique();
        table.string('role').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.timestamp('createdAt').notNullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('user');
}
exports.down = down;
