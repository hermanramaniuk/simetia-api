import Knex from 'knex';

export async function seed(knex: Knex) {
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