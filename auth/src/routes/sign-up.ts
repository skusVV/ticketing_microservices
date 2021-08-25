import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError, validateRequest } from '@vs-tickets/common';

import { body } from 'express-validator';
import { User } from '../models/user';


const router = express.Router();

router.post('/api/users/sign-up',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password').trim().isLength({ min: 4, max: 20  }).withMessage('Password has to be 4-20 symbols')
    ],
    validateRequest,
    async(req: Request, res: Response) => {

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new BadRequestError('Email already used');
    }

    const user = User.build({ email, password });
    await user.save();
    const userJwt = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY!);

    req.session = { jwt: userJwt };


    return res.status(201).send(user);
});

export { router as SignUpUserRouter };