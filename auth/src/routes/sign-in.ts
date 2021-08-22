import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { BadRequestError  } from '../errors/bad-request.error';
import { validateRequest } from '../middlewares/validate-request';
import { Password } from '../serives/password';

const router = express.Router();

router.post('/api/users/sign-in',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body( 'password').trim().notEmpty().withMessage('Password field is required')
    ],
    validateRequest,
    async(req: Request, res: Response) => {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            throw new BadRequestError('Email or password is wrong');
        }

        const passwordMatch = await Password.compare(existingUser.password, password);

        if (!passwordMatch) {
            throw new BadRequestError('Email or password is wrong');
        }

        const userJwt = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_KEY!);

        req.session = { jwt: userJwt };

        return res.status(200).send(existingUser);
});

export { router as SignInUserRouter };