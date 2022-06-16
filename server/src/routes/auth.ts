import express from 'express';
import {
  getUser,
  getUsers,
  createUser,
  logUserIn,
  deleteUser,
} from '../controllers/auth';
const router = express.Router();

router.get('/users', getUsers);
router.get('/user', getUser); // no id?
router.post('/user/create', createUser); // no id?
router.post('/user/delete', deleteUser); // no id?
// need update route - PUT request? // no id?
router.post('/user/login', logUserIn); // no id?
// check WDS if he does similar thing with passing in ids etc
// if want to be able to view other users' profiles, may need id/username (so can have an account profile url)

export default router;
