import express, { Request, Response } from 'express';
import { currentUser } from '@vs-tickets/common';

const router = express.Router();

router.get('/api/users/current-user', currentUser, (req: Request, res: Response) => {
    return res.send({ currentUser: req.currentUser || null });
});

export { router as CurrentUserRouter };