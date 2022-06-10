import { Request, Response } from 'express';
import { User } from '../models/auth';

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.fetchAll();

  if (!users) {
    return res.status(404).send('No users found');
  }

  res.send(users);
};

export const getUser = async (req: Request, res: Response) => {
  const user = await User.findByEmail(req.body.email);

  if (!user) {
    return res.status(404).send('No user found');
  }

  res.send(user);
};
