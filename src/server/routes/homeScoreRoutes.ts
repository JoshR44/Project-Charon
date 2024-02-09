import type { Express, Request, Response } from 'express';

import { ScoreBoardEvent } from '../../constants/events';
import { setHtmlResponse } from '../setHtmlResponse';

export const addHomeScoreRoutes = (app: Express) => {
  console.log('Adding home score routes');

  app.get('/homeScore', (_req: Request, res: Response) => {
    console.log('homeScore get Hit');
    return res.status(200).send(setHtmlResponse(global.scoreBoard.teamInfo.homeScore));
  });

  app.post('/homeScore', (req: Request, res: Response) => {
    console.log('homeScore post Hit');

    if (req.query.decrement) global.scoreBoard.teamInfo.homeScore -= 1;
    else if (req.query.reset) global.scoreBoard.teamInfo.homeScore = 0;
    else global.scoreBoard.teamInfo.homeScore += 1;

    global.eventEmitter.emit(ScoreBoardEvent);
    return res.status(204).send();
  });
};
