import express, { Response, Request } from 'express';
import { currentUser, requireAuth, validateRequest } from '@vs-tickets/common';
import { body } from 'express-validator';
import { NotFoundError} from '@vs-tickets/common'
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets/:id',
    currentUser,
    requireAuth,
    validateRequest,
    async(req: Request, res: Response) => {
        const { id } = req.params;
        const ticket = await Ticket.findById(id);

        if (!ticket) {
            throw new NotFoundError();
        }

        return res.send(ticket);
    });

export { router as getTicketRouter };