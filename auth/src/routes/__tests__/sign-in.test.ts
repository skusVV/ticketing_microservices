import request from 'supertest';
import { app } from '../../app';

describe('SIgn in', () => {
    it('Should return 400 for unknown user', async () => {
        return request(app)
            .post('/api/users/sign-in')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(400);
    });

    it('Should return 200 for known user', async () => {
        await request(app)
            .post('/api/users/sign-up')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(201);

        await request(app)
            .post('/api/users/sign-in')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(200);
    });

    it('Should has a cookie', async () => {
        await request(app)
            .post('/api/users/sign-up')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(201);

        const response = await request(app)
            .post('/api/users/sign-in')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(200);

        expect(response.get('Set-Cookie')).toBeDefined();
    });

    it('Should return 400 for incorrect login', async () => {
        await request(app)
            .post('/api/users/sign-up')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(201);

        await request(app)
            .post('/api/users/sign-in')
            .send({
                email: 'test1@test.com',
                password: 'password'
            })
            .expect(400);
    });

    it('Should return 400 for incorrect password', async () => {
        await request(app)
            .post('/api/users/sign-up')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(201);

        await request(app)
            .post('/api/users/sign-in')
            .send({
                email: 'test@test.com',
                password: 'password1'
            })
            .expect(400);
    });

    it('Should return 400 for invalid email', async () => {
        return request(app)
            .post('/api/users/sign-in')
            .send({
                email: 'dasd',
                password: 'password'
            })
            .expect(400);
    });

    it('Should return 400 for invalid password', async () => {
        return request(app)
            .post('/api/users/sign-in')
            .send({
                email: 'test@gmail.com',
                password: '2'
            })
            .expect(400);
    });

    it('Should return 400 for missing password', async () => {
        return request(app)
            .post('/api/users/sign-in')
            .send({
                email: 'test@gmail.com',
                password: ''
            })
            .expect(400);
    });

    it('Should return 400 for missing email', async () => {
        return request(app)
            .post('/api/users/sign-in')
            .send({
                email: '',
                password: 'password'
            })
            .expect(400);
    });
});