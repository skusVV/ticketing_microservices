import express, { Response, Request } from 'express';
import { Ticket } from '../models/ticket';
import { currentUser, NotFoundError, requireAuth, validateRequest, NotAuthorizedError } from '@vs-tickets/common';
import { body } from 'express-validator';

const router = express.Router();

router.put('/api/tickets/:id',
    currentUser,
    requireAuth,
    [
        body( 'title').notEmpty().withMessage('Title field is invalid'),
        body( 'price').isFloat({ gt: 0 }).notEmpty().withMessage('Price field is invalid')
    ],
    validateRequest,
    async(req: Request, res: Response) => {
        const { id } = req.params;
        const { title, price } = req.body;
        const ticket = await Ticket.findById(id);

        if (!ticket) {
            throw new NotFoundError();
        }

        if(ticket.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }

        ticket.set({ title, price });
        ticket.save();

        return res.send(ticket);
    });

export { router as updateTicketRouter };