import { rest } from 'msw';

export const handlers = [
    rest.post('http://localhost:8000/api/user/create', (req, res, ctx) => {
        const { email } = req.body;

        if (email === 'account@already.exists') {
            return res(ctx.status(404), ctx.json('User already exists. Please log in.'));
        }

        return res(
            ctx.status(200),
            ctx.json({
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVAZS5lIiwiaGFzaGVkUGFzc3dvcmQiOiIkMmIkMTAkc05kcFZJV0daR1pDNXVldDM0eWk4LmpLU2ZRRHlWUW5FdjJPZGFLWW5ySFlLZ2czOTN4WVMiLCJkYXRlQ3JlYXRlZCI6IjIwMjItMDctMDJUMTA6MzA6MzUuOTAyWiIsIl9pZCI6IjYyYzAxZTRiZmM4MTFmN2EwMDlhZmJlZiIsImlhdCI6MTY1Njc1NzgzNSwiZXhwIjoxNjU2NzU5Mjc1fQ.2uHFFAJ0oJqve0GKHA8t0-wvo_cBO69yh1qn-9NnGTU',
                id: '62c01e4bfc811f7a009afbef',
            })
        );
    }),

    rest.post('http://localhost:8000/api/user/forgot-password', (req, res, ctx) => {
        const { email } = req.body;

        if (email === 'user@not.found') {
            return res(ctx.status(404), ctx.json('No user found'));
        }

        return res(ctx.status(200), ctx.send('http://localhost:3000/reset-password?id=some_id&jwt=some_token'));
    }),

    rest.post('http://localhost:8000/api/user/reset-password', (req, res, ctx) => {
        // const { email } = req.body;

        // if (email === 'user@not.found') {
        //     return res(ctx.status(404), ctx.json('No user found'));
        // }

        return res(ctx.status(200));
    }),
];
