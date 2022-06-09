import express, { Application, NextFunction, Request, Response } from 'express';
import authRoutes from './routes/auth';

const app: Application = express();

const PORT = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('test homepage response');
});

app.use(authRoutes);

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}: http://localhost:${PORT}/`)
);
