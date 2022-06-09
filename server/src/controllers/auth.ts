import { Request, Response } from 'express';
import { User } from '../models/auth';

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.fetchAll();
  res.send(users);

  // old way below, now added as a class method:
  //   try {
  //     const db = getDb();
  //     const collection = db.collection(collectionName);
  //     const users = await collection.find().toArray(); // may need to optimise as it gets ALL users - what if a million users existed?
  //     res.send(users); // res.json(users);
  //   } catch (err) {
  //     console.error(err);
  //     throw err;
  //   }
};
