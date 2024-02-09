import type { Express, Request, Response } from 'express';

export const addDebugRoutes = (app: Express) => {
  console.log('Adding debug routes');
  app.get('/debug', (_req: Request, res: Response) => {
    console.log('debug Route Hit');
    const { clockInterval, ...scoreBoardWithoutInterval } = global.scoreBoard;
    return res.status(200).send(scoreBoardWithoutInterval);
  });
};
