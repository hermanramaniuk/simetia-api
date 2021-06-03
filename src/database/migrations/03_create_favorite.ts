import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('favorite', table => {
        table.increments('id').primary();
        table.integer('userId').notNullable();
        table.integer('bookId').notNullable();
        table.timestamp('createdAt').notNullable();
        table.integer('isDelete').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('usergroup');
}