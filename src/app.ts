import express, { Request, Response } from 'express';
import userRouter from '../routes/userRoutes';
import bookRouter from '../routes/bookRoutes';
import bookCaseRouter from '../routes/bookCaseRoutes';
import reviewRouter from '../routes/reviewRoutes';
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow sending cookies and HTTP authentication
};

app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/books', bookRouter)
app.use('/api/v1/bookCase', bookCaseRouter)
app.use('/api/v1/reviews', reviewRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

export default app;