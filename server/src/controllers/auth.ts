import { Request, Response } from 'express';
import { User } from '../models/auth';
import bcrypt from 'bcrypt';
import { USERS_COLLECTION_NAME } from '../utils/db';
import { getCollection } from '../utils/helpers';
const mongodb = require('mongodb'); // do not convert to import (otherwise undefined)

// does anywhere else here need try catch?

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

  res.status(201).json({ token, id: saveToDb.insertedId });
};

// only updates email for now...
export const updateUser = async (req: Request, res: Response) => {
  const collection = getCollection(USERS_COLLECTION_NAME);

  try {
    const updateResult = await collection.updateOne(
      {
        _id: new mongodb.ObjectId(req.body.id), // new mongodb.ObjectId needed, otherwide null; converts to BSON
      },
      {
        $set: {
          email: req.body.email,
        },
      }
    );

    if (!updateResult.modifiedCount) {
      return res.status(500).send('Could not update user.');
    }

    res.send({ updateResult });
  } catch (err: any) {
    return res.status(400).send(err.message);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const deleteUserResult = await User.delete(id);
    res.send({ deleteUserResult });
  } catch (err: any) {
    return res.status(500).send(err.message); // would prefer to set status code from err as it's not always 500!
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.body.id);

    if (!user) {
      return res.status(404).send('No user found');
    }

    res.send(user);
  } catch (err: any) {
    return res.status(400).send(err.message);
  }
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
  return res.json({ token, id: user._id });
};
