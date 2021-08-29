import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto'
import { TicketCreatedListener } from './events/ticket-created-listener';
console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
}); // stan means client

stan.on('connect', () => {
    console.log('Listener Connected to NATS');
    stan.on('close', () => {
        console.log('Listener Disconnected to NATS');
        process.exit();
    });
    new TicketCreatedListener(stan).listen();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());


