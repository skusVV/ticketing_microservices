import request from 'supertest';
import { app } from '../../app';

describe('Current user', () => {
    it('Should return current user details', async () => {
        const cookie = await global.signin();

        const response = await request(app)
            .get('/api/users/current-user')
            .set('Cookie', cookie)
            .send()
            .expect(200);

        expect(response.body.currentUser.email).toEqual('test@test.com');
    });

    it('Should return null', async () => {

        const response = await request(app)
            .get('/api/users/current-user')
            .set('Cookie', '')
            .send()
            .expect(200);

        expect(response.body.currentUser).toEqual(null);
    });
});
