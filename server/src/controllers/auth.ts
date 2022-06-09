import { Request, Response } from 'express';
import { MongoClient } from 'mongodb';

const url =
  process.env.URI ||
  'mongodb+srv://njs91:bIucm9ZNvYAZiAZG@cluster0.f4crzod.mongodb.net/?retryWrites=true&w=majority'; // @todo remove
const client = new MongoClient(url);

export const getUsers = async (req: Request, res: Response) => {
  const [dbName, colName] = ['userdb', 'users'];

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(colName);
    const users = await collection.find().toArray(); // may need to optimise as it gets ALL users - what if a million users existed?
    res.send(users); // res.json(users);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
};

// controller example from other project:

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
