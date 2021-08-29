import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto'
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

    const options = stan.subscriptionOptions()
        .setManualAckMode(true)
        .setDeliverAllAvailable()
        .setDurableName('any-service');
    const subscriptions = stan.subscribe('ticket:create', 'test-service-queue-group', options);

    subscriptions.on('message', (msg: Message) => {
        const data = msg.getData();

        if (typeof data === 'string') {
            console.log(`Received event: ${msg.getSequence()}, with data: ${data}`);
            msg.ack();
        }
    });
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());