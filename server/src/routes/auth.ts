import express from 'express';
import { getUser, getUsers } from '../controllers/auth';
const router = express.Router();

router.get('/users', getUsers);
router.get('/user', getUser);

export default router;
