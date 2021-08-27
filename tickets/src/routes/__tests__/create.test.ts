import request from 'supertest';
import { Ticket } from '../../models/ticket';
import { app } from '../../app';

describe('/api/tickets [POST]', () => {

    it('Route handler exists', async () => {
        const response = await request(app)
            .post('/api/tickets')
            .send({});

        expect(response.status).not.toEqual(404);
    });

    it('Return 401 if user not signed in', async () => {
        const response = await request(app)
            .post('/api/tickets')
            .send({})
            .expect(401);
    });

    it('Return status other then 401 if user sign in', async () => {
        const response = await request(app)
            .post('/api/tickets')
            .set('Cookie', global.signin())
            .send({});

        expect(response.status).not.toEqual(401);
    });


    it('Return an error if invalid title', async () => {
        await request(app)
            .post('/api/tickets')
            .set('Cookie', global.signin())
            .send({})
            .expect(400);
    });

    it('Return an error if invalid title', async () => {
        await request(app)
            .post('/api/tickets')
            .set('Cookie', global.signin())
            .send({ title: ''})
            .expect(400);
    });
    it('Return an error if invalid price', async () => {
        await request(app)
            .post('/api/tickets')
            .set('Cookie', global.signin())
            .send({ price: -10, title: 'title' })
            .expect(400);
    });

    it('Return an error if invalid price', async () => {
        await request(app)
            .post('/api/tickets')
            .set('Cookie', global.signin())
            .send({ title: 'title'})
            .expect(400);
    });
    it('it create a ticket with valid input', async () => {
        let tickets = await Ticket.find({});
        expect(tickets.length).toEqual(0);

        await request(app)
            .post('/api/tickets')
            .set('Cookie', global.signin())
            .send({ title: 'title' , price: 25})
            .expect(201);

        tickets = await Ticket.find({});
        expect(tickets.length).toEqual(1);
    });
});
