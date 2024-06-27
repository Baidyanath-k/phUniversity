import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import router from './app/allRoutes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandlers';
import { notFountRoute } from './app/middlewares/notFoundRout';
const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors());

// route call by (allRoutes--> index.ts)
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('PH University!');
});

// global error handler from middlewares
app.use(globalErrorHandler);

// rout not found from middlewares
app.use(notFountRoute);

export default app;
