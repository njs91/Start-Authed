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

        return res(ctx.status(200));
    }),

    rest.post('http://localhost:8000/api/user/reset-password', (req, res, ctx) => {
        const { password } = req.body;

        if (password === 'usernotfounderror') {
            return res(ctx.status(404), ctx.json('No user found'));
        }

        return res(ctx.status(200));
    }),

    rest.post('http://localhost:8000/api/user/login', (req, res, ctx) => {
        const { email } = req.body;

        if (email === 'user@not.found') {
            return res(ctx.status(404), ctx.json('User not found. Please create an account.'));
        }

        return res(
            ctx.status(200),
            ctx.json({
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmIwMjA3MTllZTI0ZTM2ZjY2ZmM1ZDciLCJlbWFpbCI6ImFAYS5hIiwiaGFzaGVkUGFzc3dvcmQiOiIkMmIkMTAkdkR2dU4uR3I3NFR5L2sxbEREaDF3dWZIT2FaQkwzUzdiTWJBSnR5QWV0emlvR3hUemNoOGEiLCJkYXRlQ3JlYXRlZCI6IjIwMjItMDYtMjBUMDc6MjM6MjkuNjQyWiIsImlhdCI6MTY1Njk1NjI5MywiZXhwIjoxNjU2OTU3NzMzfQ.s0hwENfzRliKk1FDJHqouS3j-_Gtqb5pwEibziKLS1s',
                id: '62b020719ee24e36f66fc5d7',
            })
        );
    }),

    rest.put('http://localhost:8000/api/user/update', (req, res, ctx) => {
        const { email } = req.body;

        if (email === 'current@same.email') {
            return res(ctx.status(500), ctx.json('Could not update user.'));
        }

        return res(ctx.status(200));
    }),

    rest.post('http://localhost:8000/api/user/delete', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                deleteUserResult: {
                    acknowledged: true,
                    deletedCount: 1,
                },
            })
        );
    }),
];
