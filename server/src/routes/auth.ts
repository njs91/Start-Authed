import express from 'express';
import { getUsers } from '../controllers/auth';
const router = express.Router();

router.get('/users', getUsers);

export default router;

// may need to add models - example from other project:

// class Sub {
//     constructor(name, email, tag) {
//       this.name = name;
//       this.email = email;
//       this.tag = tag;
//       this.subDate = function () {
//         const d = new Date(),
//           fullDate = d.getDate() + ' ' + d.toLocaleString('default', {
//             month: 'long'
//           }) + ' ' + d.getFullYear();
//         return fullDate
//       }();
//       this.verified = false; // becomes true if subscriber clicks verification url emailed to them
//       this.authCode = Math.floor(Math.random() * 999) + 1;
//       latestSubs.push(this);
//     }

//     save() { // saves instance to DB
//       const db = getDb();
//       return db.collection('subs').insertOne(this) // insert into this collection, created if doesn’t exist
//         .then(result => {
//           console.log('save() result: ', result);
//           return result;
//         })
//         .catch(err => {
//           console.log('error: ', err)
//         });
//     }

//     also has other methods...
