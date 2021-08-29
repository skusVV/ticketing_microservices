import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';
console.clear();

const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
}); // stan means client

stan.on('connect', async() => {
    console.log('Publisher Connected to NATS');

    const publisher = new TicketCreatedPublisher(stan);
    try {
        await publisher.publish({
            id: '123',
            title: 'title_1',
            price: 20
        });
    } catch (err) {
        console.error(err);
    }
});