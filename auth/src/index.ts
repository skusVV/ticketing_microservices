import  'express-async-errors'
import mongoose from 'mongoose';
import { app } from './app';

const init = async() => {
    if(!process.env.JWT_KEY) {
        throw new Error('JWT_KEY is not defined');
    }

    try {
        await mongoose.connect( 'mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connected');
    } catch (e) {
        console.log(e);
    }

    app.listen(3000, () => {
        console.log('Auth listen on port 3000');
    });
};

init();
