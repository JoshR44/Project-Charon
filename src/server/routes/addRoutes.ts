import type { Express } from 'express';
import { addAwayScoreRoutes } from './awayScoreRoutes';
import { addDebugRoutes } from './debugRoutes';
import { addHomeScoreRoutes } from './homeScoreRoutes';
import { addTeamsRoutes } from './teamsRoutes';
import { addClockRoutes } from './clockRoutes';
import { addSetQuarterRoutes } from './setQuarterRoutes';

export const addRoutes = (app: Express) => {
  addHomeScoreRoutes(app);
  addAwayScoreRoutes(app);
  addTeamsRoutes(app);
  addClockRoutes(app);
  addSetQuarterRoutes(app);
  addDebugRoutes(app);
};
