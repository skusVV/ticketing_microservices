import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { app } from '../app';
import request from 'supertest';

let mongo: any;

declare global {
    var signin: () => string[];
}

beforeAll(async() => {
    process.env.JWT_KEY = 'secret'
    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true});
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for  (const collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = () => {
    const payload = {
        email: 'test@test.com',
        id: new mongoose.Types.ObjectId().toHexString()
    }
    const token = jwt.sign(payload, process.env.JWT_KEY!);
    const session = { jwt: token };
    const sessionJSON = JSON.stringify(session);
    const base64 = Buffer.from(sessionJSON).toString('base64');

    return [`express:sess=${base64}`];
};