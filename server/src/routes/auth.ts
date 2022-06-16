import express from 'express';
import {
  getUser,
  getUsers,
  createUser,
  logUserIn,
  deleteUser,
  updateUser,
} from '../controllers/auth';

const router = express.Router();

router.get('/users', getUsers);
router.get('/user', getUser);
router.post('/user/create', createUser);
router.put('/user/update', updateUser);
router.post('/user/delete', deleteUser);
router.post('/user/login', logUserIn);
// if want to be able to view other users' profiles, may need id/username (so can have an account profile url)

export default router;
