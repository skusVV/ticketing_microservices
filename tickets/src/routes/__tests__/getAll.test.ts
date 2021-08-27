import request from 'supertest';
import { app } from '../../app';

const createTicket = (title: string, price: number) => {
    return request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({ title , price});
}

describe('/api/tickets [GET]', () => {

    it('It should return list of tickets', async () => {
        await createTicket('title', 1);
        await createTicket('title2', 12);
        await createTicket('title3', 13);

        const res = await request(app)
            .get('/api/tickets');

        expect(res.body.length).toEqual(3);
    });
});
