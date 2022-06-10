import { getDb } from './db';

export const getCollection = (name: string) => {
  const db = getDb();
  return db.collection(name);
};
