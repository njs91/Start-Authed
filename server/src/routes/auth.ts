import express from 'express';
import {
  getUser,
  getUsers,
  createUser,
  logUserIn,
  deleteUser,
  updateUser,
  sendPasswordResetEmail,
} from '../controllers/auth';

const router = express.Router();

router.get('/api/users', getUsers);
router.get('/api/user', getUser);
router.post('/api/user/create', createUser);
router.put('/api/user/update', updateUser);
router.post('/api/user/delete', deleteUser);
router.post('/api/user/login', logUserIn);
router.post('/api/user/forgot-password', sendPasswordResetEmail);
// if want to be able to view other users' profiles, may need dynamic id/username (so can have an account profile url)

export default router;
