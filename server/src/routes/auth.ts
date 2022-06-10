import express from 'express';
import { getUser, getUsers, createUser } from '../controllers/auth';
const router = express.Router();

router.get('/users', getUsers);
router.get('/user', getUser);
router.post('/user/create', createUser);

export default router;
