import nats from 'node-nats-streaming';
console.clear();

const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
}); // stan means client

stan.on('connect', () => {
    console.log('Publisher Connected to NATS');

    const data = JSON.stringify({
        id: '123',
        title: 'title_1',
        price: 20
    });

    stan.publish('ticket:create', data, () => {
        console.log('Event ticket:create published');
    });
});