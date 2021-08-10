import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation.error';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request.error';

const router = express.Router();

router.post('/api/users/sign-up',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password').trim().isLength({ min: 4, max: 20  }).withMessage('Password has to be 4-20 symbols')
    ],
    async(req: Request, res: Response) => {
    const errors = validationResult(req);

    if  (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array())
    }

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