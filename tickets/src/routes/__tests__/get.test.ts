import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose'

describe('/api/tickets/:id [GET]', () => {

    it('Should return 404 if ticket not found', async () => {
        await request(app)
            .get(`/api/tickets/${new mongoose.Types.ObjectId().toHexString()}`)
            .set('Cookie', global.signin())
            .expect(404);
    });

    it('Should return ticket if ticket is found', async () => {
        const testTicket = { title: 'test', price: 20 };

        const response = await request(app)
            .post('/api/tickets')
            .set('Cookie', global.signin())
            .send(testTicket)
            .expect(201);

        const ticketResponse = await request(app)
            .get(`/api/tickets/${response.body.id}`)
            .set('Cookie', global.signin())
            .expect(200);

        expect(ticketResponse.body.title).toEqual(testTicket.title);
        expect(ticketResponse.body.price).toEqual(testTicket.price);
    });
});
