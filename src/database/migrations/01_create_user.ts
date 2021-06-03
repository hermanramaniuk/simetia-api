import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('user', table => {
        table.increments('id');
        table.string('name').notNullable().unique();
        table.string('role').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.timestamp('createdAt').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('user');
}