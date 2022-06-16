import { USERS_COLLECTION_NAME } from '../utils/db';
import { getCollection } from '../utils/helpers';
import jwt from 'jsonwebtoken';

export class User {
  email: string;
  hashedPassword: any;
  dateCreated: Date;

  constructor(email: string, hashedPassword: any) {
    this.email = email.toLowerCase();
    this.hashedPassword = hashedPassword;
    this.dateCreated = new Date();
  }

  signToken() {
    try {
      // { ...this } overcomes error `Expected "payload" to be a plain object`
      const token = jwt.sign({ ...this }, this.email, {
        expiresIn: 60 * 24,
      });
      return token;
    } catch (err) {
      throw err;
    }
  }

  async saveToDb() {
    try {
      const collection = getCollection(USERS_COLLECTION_NAME); // make global variable instead of repeating in every method?
      const saveResult = await collection.insertOne(this);
      return saveResult;
    } catch (err) {
      throw err;
    }
  }

  static async deleteUser(email: string) {
    try {
      const collection = getCollection(USERS_COLLECTION_NAME);
      const user = await User.findByEmail(email);

      if (!user) throw new Error('404 - User not found');

      const deleteResult = await collection.deleteOne(user);

      if (!deleteResult) throw new Error('500 - Could not delete user');

      return deleteResult;
    } catch (err) {
      throw err;
    }
  }

  static async fetchAll() {
    try {
      const collection = getCollection(USERS_COLLECTION_NAME);
      const users = await collection.find().toArray(); // @todo: may need to optimise as it gets ALL users - what if a million users existed?
      return users;
    } catch (err) {
      throw err;
    }
  }

  static async findByEmail(email: string) {
    try {
      const collection = getCollection(USERS_COLLECTION_NAME);
      const user = await collection.findOne({ email });
      return user;
    } catch (err) {
      throw err;
    }
  }
}
