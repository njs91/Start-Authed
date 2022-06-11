import express from 'express';
import { getUser, getUsers, createUser, logUserIn } from '../controllers/auth';
const router = express.Router();

router.get('/users', getUsers);
router.get('/user', getUser);
router.post('/user/create', createUser);
// presumably need update and delete routes
router.post('/user/login', logUserIn);

export default router;
