import request from 'supertest';
import { app } from '../../app';

describe('SIgn up', () => {
    it('Should return 201 on success sign-up', async () => {
        return request(app)
            .post('/api/users/sign-up')
            .send({
               email: 'test@test.com',
               password: 'password'
            })
            .expect(201);
    });

    it('Should return 400 for invalid email', async () => {
        return request(app)
            .post('/api/users/sign-up')
            .send({
                email: 'dasd',
                password: 'password'
            })
            .expect(400);
    });

    it('Should return 400 for invalid password', async () => {
        return request(app)
            .post('/api/users/sign-up')
            .send({
                email: 'test@gmail.com',
                password: '2'
            })
            .expect(400);
    });

    it('Should return 400 for missing password', async () => {
        return request(app)
            .post('/api/users/sign-up')
            .send({
                email: 'test@gmail.com',
                password: ''
            })
            .expect(400);
    });

    it('Should return 400 for missing email', async () => {
        return request(app)
            .post('/api/users/sign-up')
            .send({
                email: '',
                password: 'password'
            })
            .expect(400);
    });

    it('Should return 400 for duplicated password', async () => {
        await request(app)
            .post('/api/users/sign-up')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(201);

        await request(app)
            .post('/api/users/sign-up')
            .send({
                email: 'test@test.com',
                password: 'password'
            })
            .expect(400);
    });

    it('Should has a cookie', async () => {
        const response = await request(app)
            .post('/api/users/sign-up')
            .send({
                email: 'test@gmail.com',
                password: 'password'
            })
            .expect(201);

        expect(response.get('Set-Cookie')).toBeDefined();
    });

});