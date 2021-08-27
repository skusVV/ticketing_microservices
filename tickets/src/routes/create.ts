import express, { Response, Request } from 'express';
import { currentUser, requireAuth, validateRequest } from '@vs-tickets/common';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.post('/api/tickets',
    currentUser,
    requireAuth,
    [
        body( 'title').notEmpty().withMessage('Title field is invalid'),
        body( 'price').isFloat({ gt: 0 }).notEmpty().withMessage('Price field is invalid')
    ],
    validateRequest,
    async(req: Request, res: Response) => {
        const { title, price } = req.body;
        const ticket = Ticket.build({ title, price, userId: req.currentUser!.id });
        await ticket.save();

        return res.status(201).send(ticket);
});

export { router as createTicketRouter };