import type { Express } from 'express';
import { addAwayScoreRoutes } from './awayScoreRoutes';
import { addDebugRoutes } from './debugRoutes';
import { addHomeScoreRoutes } from './homeScoreRoutes';
import { addTeamsRoutes } from './teamsRoutes';

export const addRoutes = (app: Express) => {
  addHomeScoreRoutes(app);
  addAwayScoreRoutes(app);
  addTeamsRoutes(app);
  addDebugRoutes(app);
};
