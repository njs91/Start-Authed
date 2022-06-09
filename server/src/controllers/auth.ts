import { Request, Response } from 'express';
import { getDb } from '../utils/db';

export const getUsers = async (req: Request, res: Response) => {
  const collectionName = 'users';

  try {
    const db = getDb();
    const collection = db.collection(collectionName);
    const users = await collection.find().toArray(); // may need to optimise as it gets ALL users - what if a million users existed?
    res.send(users); // res.json(users);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// consider using models (classes) - controller example from other project:

// exports.allSubs = (req, res, next) => {
//     Sub.fetchAll()
//       .then((subs) => {
//         res.render('subs', {
//           pageHead: 'All Subscribers',
//           pageTitle: 'Viewing All Subscribers',
//           pageIntro: 'This is a list of all entries.',
//           subscribers: subs,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
