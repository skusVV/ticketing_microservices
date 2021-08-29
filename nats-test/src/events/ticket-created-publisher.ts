import {TicketCreatedEvent} from '../../../common/src/events/ticket-created-event'
import { Subjects } from '../../../common/src/events/subjects';
import { Publisher } from '../../../common/src/events/base-publisher';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;

}