import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes';

const app = express();
const port = 3001;

app.use(express.json());

app.use('/users', userRoutes)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
