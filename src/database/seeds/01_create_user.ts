import Knex from 'knex';
import { AES } from 'crypto-ts';

export async function seed(knex: Knex) {
    await knex('user').insert([
    ]);
}