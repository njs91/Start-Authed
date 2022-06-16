import { Request, Response } from 'express';
import { User } from '../models/auth';
import bcrypt from 'bcrypt';

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existingUser = await User.findByEmail(email);

  if (existingUser) {
    return res.status(409).send('User already exists. Please log in.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User(email, hashedPassword);
  const saveToDb = await newUser.saveToDb();

  if (!saveToDb) {
    return res.status(500).send('Could not insert user into the database.');
  }

  const token = newUser.signToken();

  res.status(201).json({ token }); // if want to return an id, presumably need to generate one
};

export const deleteUser = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const deleteUserResult = await User.deleteUser(email);
    res.send({ deleteUserResult });
  } catch (err: any) {
    return res.status(500).send(err.message); // would prefer to set status code from err as it's not always 500!
  }
};

export const getUser = async (req: Request, res: Response) => {
  const user = await User.findByEmail(req.body.email);

  if (!user) {
    return res.status(404).send('No user found');
  }

  res.send(user);
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.fetchAll();

  if (!users) {
    return res.status(404).send('No users found');
  }

  res.send(users);
};

export const logUserIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);

  if (!user) {
    return res.status(404).send('User not found. Please create an account.');
  }

  const correctPassword = await bcrypt.compare(password, user.hashedPassword);

  if (!correctPassword) {
    return res.status(403).send('Wrong password for this account.');
  }

  // assign object methods to the user instance as objects retrieved from db don't have methods
  Object.setPrototypeOf(user, User.prototype);
  const token = user.signToken();
  return res.json({ token }); // may want to also return an id
};
