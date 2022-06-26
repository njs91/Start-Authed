import express, { Application, NextFunction, Request, Response } from 'express';
import authRoutes from './routes/auth';
import { connectToDb } from './utils/db';
import cors from 'cors';
import { corsOptions } from './utils/cors';
require('dotenv').config(); // enables usage of process.env.SOMETHING

const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(cors()); // change to the below for a more secure, real app
// app.use(cors(corsOptions)); // allows front-end to communicate with back-end
app.use(express.json()); // seemingly required for req.body
// app.use(express.urlencoded({extended:false})); // may need this?

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('test homepage response');
});

app.use(authRoutes);

connectToDb(() => {
  app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}: http://localhost:${PORT}/`)
  );
});
