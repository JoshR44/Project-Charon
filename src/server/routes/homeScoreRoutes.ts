import type { Express, Request, Response } from 'express';

import { setHtmlResponse } from '../setHtmlResponse';

export const addHomeScoreRoutes = (app: Express) => {
  console.log('Adding home score routes');

  app.get('/homeScore', (_req: Request, res: Response) => {
    console.log('homeScore get Hit');
    return res.status(200).send(setHtmlResponse(global.scoreBoard.homeScore));
  });

  app.post('/homeScore', (req: Request, res: Response) => {
    console.log('homeScore post Hit');
    req.query.decrement ? (global.scoreBoard.homeScore -= 1) : (global.scoreBoard.homeScore += 1);
    global.eventEmitter.emit('updateHomeScore');
    return res.status(204).send();
  });
};
