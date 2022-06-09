import { getDb } from '../utils/db';

export class User {
  email: string;
  hashedPassword: any;

  constructor(email: string, hashedPassword: any) {
    this.email = email;
    this.hashedPassword = hashedPassword;
  }

  static async fetchAll() {
    const collectionName = 'users';

    try {
      const db = getDb();
      const collection = db.collection(collectionName);
      const users = await collection.find().toArray(); // may need to optimise as it gets ALL users - what if a million users existed?
      return users;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  // also add other methods like a save method instead of manually calling insertOne for example
}
