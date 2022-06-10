import { getCollection } from '../utils/helpers';

const COLLECTION_NAME = 'users';

export class User {
  email: string;
  hashedPassword: any;

  constructor(email: string, hashedPassword: any) {
    this.email = email;
    this.hashedPassword = hashedPassword;
  }

  static async fetchAll() {
    try {
      const collection = getCollection(COLLECTION_NAME);
      const users = await collection.find().toArray(); // @todo: may need to optimise as it gets ALL users - what if a million users existed?
      return users;
    } catch (err) {
      throw err;
    }
  }

  static async findByEmail(email: string) {
    try {
      const collection = getCollection(COLLECTION_NAME);
      const user = await collection.findOne({ email });
      return user;
    } catch (err) {
      throw err;
    }
  }
}
