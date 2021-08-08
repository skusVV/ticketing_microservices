import express from 'express';
import  'express-async-errors'
import { json } from 'body-parser';
import { CurrentUserRouter } from './routes/current-user';
import { SignInUserRouter } from './routes/sign-in';
import { SignOutUserRouter } from './routes/sign-out';
import { SignUpUserRouter } from './routes/sign-up';
import { requestHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found.error';

const app = express();

app.use(json());
app.use(CurrentUserRouter);
app.use(SignInUserRouter);
app.use(SignOutUserRouter);
app.use(SignUpUserRouter);

app.all('/*', async() => {
    throw new NotFoundError();
})

app.use(requestHandler);

app.listen(3000, () => {
    console.log('Auth listen on port 3000');
});