import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('library').insert([
        {
            id: '1',
            bookName: 'Anna Karenina',
            bookSummary: '',
            createdAt: '2020-10-10 10:00:00',
            isDelete: '0'
        },
        {
            id: '2',
            bookName: 'To Kill a Mockingbird',
            bookSummary: '',
            createdAt: '2020-10-10 10:00:00',
            isDelete: '0'
        },
        {
            id: '3',
            bookName: 'The Great Gatsby',
            bookSummary: '',
            createdAt: '2020-10-10 10:00:00',
            isDelete: '0'
        },
        {
            id: '4',
            bookName: 'One Hundred Years of Solitude',
            bookSummary: '',
            createdAt: '2020-10-10 10:00:00',
            isDelete: '0'
        },
        {
            id: '5',
            bookName: 'A Passage to India',
            bookSummary: '',
            createdAt: '2020-10-10 10:00:00',
            isDelete: '0'
        },
        {
            id: '6',
            bookName: 'Invisible Man',
            bookSummary: '',
            createdAt: '2020-10-10 10:00:00',
            isDelete: '0'
        },
        {
            id: '7',
            bookName: 'Don Quixote',
            bookSummary: '',
            createdAt: '2020-10-10 10:00:00',
            isDelete: '0'
        },
        {
            id: '8',
            bookName: 'Beloved',
            bookSummary: '',
            createdAt: '2020-10-10 10:00:00',
            isDelete: '0'
        },
        {
            id: '9',
            bookName: 'Anna Karenina',
            bookSummary: '',
            createdAt: '2020-10-10 10:00:00',
            isDelete: '0'
        },
        {
            id: '10',
            bookName: 'Anna Karenina',
            bookSummary: '',
            createdAt: '2020-10-10 10:00:00',
            isDelete: '0'
        },
        {
            id: '11',
            bookName: 'Anna Karenina',
            bookSummary: '',
            createdAt: '2020-10-10 10:00:00',
            isDelete: '0'
        },
        {
            id: '12',
            bookName: 'Anna Karenina',
            bookSummary: '',
            createdAt: '2020-10-10 10:00:00',
            isDelete: '0'
        },
        {
            id: '13',
            bookName: 'Anna Karenina',
            bookSummary: '',
            createdAt: '2020-10-10 10:00:00',
            isDelete: '0'
        },
        {
            id: '14',
            bookName: 'Anna Karenina',
            bookSummary: '',
            createdAt: '2020-10-10 10:00:00',
            isDelete: '0'
        },
        
    ]);
}