import type { Express } from 'express';
import { addDebugRoutes } from './debugRoutes';
import { addHomeScoreRoutes } from './homeScoreRoutes';

export const addRoutes = (app: Express) => {
  addHomeScoreRoutes(app);
  addDebugRoutes(app);
};
