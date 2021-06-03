import knex from 'knex';

const db = knex({
    client: 'pg',
    connection: {
        host :    'batyr.db.elephantsql.com',
        user:     'gfewvidg',
        password: 'P67A_Ei91pk40SmPe6dquOlhPOyyF0Gd',
        database: 'gfewvidg'
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }
});

export default db;