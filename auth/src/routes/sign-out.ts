import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/api/users/sign-out', (req: Request, res: Response) => {
    req.session = null;

    return res.send({});
});

export { router as SignOutUserRouter };