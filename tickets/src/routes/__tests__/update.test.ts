import request from 'supertest';
import mongoose from 'mongoose'
import { app } from '../../app';


const createTicket = (title: string, price: number) => {
    return request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({ title , price});
}

describe('/api/tickets/ [GET]', () => {

    it('Should 404 if ticket does not exists', async () => {
        await request(app)
            .put(`/api/tickets/${new mongoose.Types.ObjectId().toHexString()}`)
            .set('Cookie', global.signin())
            .send({ title: '33', price: 44 })
            .expect(404);
    });

    it('return 401 if user not authenticated', async () => {
        await request(app)
            .put(`/api/tickets/${new mongoose.Types.ObjectId().toHexString()}`)
            .send({ title: '33', price: 44 })
            .expect(401);
    });

    it('return 401 if user not owner of the ticket', async () => {
        const ticket = await createTicket('title2', 444)

        await request(app)
            .put(`/api/tickets/${ticket.body.id}`)
            .set('Cookie', global.signin())
            .send({ title: '33', price: 44 })
            .expect(401);
    });

    it('Return 400 if user provide invalid title or price', async () => {
        const token = global.signin();
        const ticket = await request(app)
            .post('/api/tickets')
            .set('Cookie', token)
            .send({ title: 'fsdff' , price: 333 });

        await request(app)
            .put(`/api/tickets/${ticket.body.id}`)
            .set('Cookie', token)
            .send({ title: '', price: 44 })
            .expect(400);
    });

    it('Should update ticket', async () => {
        const token = global.signin();
        const ticket = await request(app)
            .post('/api/tickets')
            .set('Cookie', token)
            .send({ title: 'fsdff' , price: 333 });

        const res = await request(app)
            .put(`/api/tickets/${ticket.body.id}`)
            .set('Cookie', token)
            .send({ title: '333', price: 44 });

        expect(res.body.id).toEqual(ticket.body.id);
        expect(res.body.title).toEqual('333');
        expect(res.body.price).toEqual(44);
    });
});
