import { Message } from 'node-nats-streaming';
import { Listener } from '../../../common/src/events/base-listener';
import { TicketCreatedEvent } from '../../../common/src/events/ticket-created-event';
import { Subjects } from '../../../common/src/events/subjects';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = 'test-service-queue-group';

    onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        console.log('OnMessage', data);

        msg.ack();
    }
}