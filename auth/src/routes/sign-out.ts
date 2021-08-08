import express from 'express';

const router = express.Router();

router.post('/api/users/sign-out', (req, res) => {
    return res.send('Hi sign-out');
});

export { router as SignOutUserRouter };