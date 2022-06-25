import { USERS_COLLECTION_NAME } from '../utils/db';
import { getCollection } from '../utils/helpers';
import jwt from 'jsonwebtoken';
const mongodb = require('mongodb'); // do not convert to import (otherwise undefined)

export class User {
  email: string;
  hashedPassword: string;
  dateCreated: Date;

  constructor(email: string, hashedPassword: string) {
    this.email = email.toLowerCase();
    this.hashedPassword = hashedPassword;
    this.dateCreated = new Date();
  }

  signToken(): string {
    // { ...this } overcomes error `Expected "payload" to be a plain object`
    const token = jwt.sign({ ...this }, this.email, {
      expiresIn: 60 * 24,
    });
    return token;
  }

  async saveToDb(): Promise<any> {
    const collection = getCollection(USERS_COLLECTION_NAME);
    const saveResult = await collection.insertOne(this);
    return saveResult;
  }

  static async delete(id: string): Promise<any> {
    const collection = getCollection(USERS_COLLECTION_NAME);
    const user = await User.findById(id);

    if (!user) throw new Error('404 - User not found');

    const deleteResult = await collection.deleteOne(user);

    if (!deleteResult) throw new Error('500 - Could not delete user');

    return deleteResult;
  }

  static async fetchAll(): Promise<any> {
    const collection = getCollection(USERS_COLLECTION_NAME);
    const users = await collection.find().toArray(); // @todo: may need to optimise as it gets ALL users - what if a million users existed?
    return users;
  }

  static async findByEmail(email: string): Promise<any> {
    const collection = getCollection(USERS_COLLECTION_NAME);
    const user = await collection.findOne({ email });
    return user;
  }

  static async findById(id: string): Promise<any> {
    const collection = getCollection(USERS_COLLECTION_NAME);
    const user = await collection.findOne({ _id: new mongodb.ObjectId(id) });
    return user;
  }
}
