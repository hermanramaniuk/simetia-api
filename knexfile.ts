import { Config } from "knex";
import path from 'path';

export const configuration: Config = {
    client: 'pg',
    connection: {
        host : process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
}
export const development: Config = { ...configuration }
export const production: Config = { ...configuration }
