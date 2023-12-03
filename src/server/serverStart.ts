import { addRoutes } from './routes/addRoutes';
import express from 'express';

export const serverStart = async (): Promise<void> => {
  console.log('Starting express server');
  const app = express();

  addRoutes(app);

  app.listen(80, () => console.log('Express server startup completed'));
};
