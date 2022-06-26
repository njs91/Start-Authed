import express from 'express';
import {
  getUser,
  getUsers,
  createUser,
  logUserIn,
  deleteUser,
  updateUser,
  sendPasswordResetEmail,
  resetPassword,
} from '../controllers/auth';

const router = express.Router();

// get
router.get('/api/users', getUsers);
router.get('/api/user', getUser);

// put
router.put('/api/user/update', updateUser);

// post
router.post('/api/user/create', createUser);
router.post('/api/user/delete', deleteUser);
router.post('/api/user/login', logUserIn);
router.post('/api/user/forgot-password', sendPasswordResetEmail); // includes id and token in search params
router.post('/api/user/reset-password', resetPassword);
// if want to be able to view other users' profiles, may need dynamic id/username (so can have an account profile url)

export default router;
