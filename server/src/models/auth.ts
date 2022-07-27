import { USERS_COLLECTION_NAME } from '../utils/db';
import { getCollection } from '../utils/helpers';
import jwt from 'jsonwebtoken';
import { DeleteResult } from 'mongodb';
const mongodb = require('mongodb'); // do not convert to import (otherwise undefined)
require('dotenv').config();

type Plans = {
  free: string;
  lite: string;
  pro: string;
};
export const PLANS: Plans = {
  free: 'free',
  lite: 'lite',
  pro: 'pro',
};

type Referrer = null | string;
type UserConstructor = {
  email: string;
  hashedPassword: string;
  plan: string;
  directAffiliateSignup: boolean;
};
export class User {
  email: string;
  hashedPassword: string;
  dateCreated: Date;
  plan: string;
  directAffiliateSignup: boolean;
  referrer: Referrer;

  constructor({
    email,
    hashedPassword,
    plan,
    directAffiliateSignup,
  }: UserConstructor) {
    this.email = email.toLowerCase();
    this.hashedPassword = hashedPassword;
    this.dateCreated = new Date();
    this.plan = plan;
    this.directAffiliateSignup = directAffiliateSignup;
    this.referrer = null;
  }

  signToken(expiry: number | string = 60 * 24): string {
    const secret = process.env.JWT_SECRET + this.hashedPassword;
    // { ...this } overcomes error `Expected "payload" to be a plain object`
    const token = jwt.sign({ ...this }, secret, {
      expiresIn: expiry,
    });
    return token;
  }

  async saveToDb(): Promise<any> {
    const collection = getCollection(USERS_COLLECTION_NAME);
    const saveResult = await collection.insertOne(this);
    return saveResult;
  }

  async addReferrer(referrerId: string): Promise<void> {
    const validReferrer = await User.findById(referrerId);
    if (!validReferrer) return;
    this.referrer = referrerId;
  }

  static async delete(id: string): Promise<DeleteResult> {
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
