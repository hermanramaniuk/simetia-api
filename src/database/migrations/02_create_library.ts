import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('library', table => {
        table.increments('id');
        table.string('bookName').notNullable();
        table.string('bookSummary').notNullable();
        table.timestamp('createdAt').notNullable();
        table.integer('isDelete').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('local');
}