import request from 'supertest';
import { app } from '../../app';

describe('Sign out', () => {
    it('Should clear a cookie', async () => {
        await request(app)
            .post('/api/users/sign-up')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(201);

        const response = await request(app)
            .post('/api/users/sign-out')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(200);

        expect(response.get('Set-Cookie')).toBeDefined();
    });
});