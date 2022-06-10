import { Request, Response } from 'express';
import { User } from '../models/auth';
import bcrypt from 'bcrypt';

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

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existingUser = await User.findByEmail(email);

  if (existingUser) {
    return res.status(409).send('User already exists. Please log in.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User(email, hashedPassword);
  const token = await newUser.saveToDb();

  res.status(201).json({ token });
};
