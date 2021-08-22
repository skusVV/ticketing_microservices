import express from 'express';
import  'express-async-errors'
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { CurrentUserRouter } from './routes/current-user';
import { SignInUserRouter } from './routes/sign-in';
import { SignOutUserRouter } from './routes/sign-out';
import { SignUpUserRouter } from './routes/sign-up';
import { requestHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found.error';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));
app.use(CurrentUserRouter);
app.use(SignInUserRouter);
app.use(SignOutUserRouter);
app.use(SignUpUserRouter);

app.all('/*', async() => {
    throw new NotFoundError();
})

app.use(requestHandler);

export { app };
