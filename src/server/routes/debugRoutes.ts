import type { Express, Request, Response } from 'express';

export const addDebugRoutes = (app: Express) => {
  console.log('Adding debug routes');
  app.get('/debug', (_req: Request, res: Response) => {
    console.log('debug Route Hit');
    return res.status(200).send(global.scoreBoard);
  });
};
