import type { Express, Request, Response } from 'express';

import { ScoreBoardEvent } from '../../constants/events';
import { setHtmlResponse } from '../setHtmlResponse';

export const addAwayScoreRoutes = (app: Express) => {
  console.log('Adding away score routes');

  app.get('/awayScore', (_req: Request, res: Response) => {
    console.log('awayScore get Hit');
    return res.status(200).send(setHtmlResponse(global.scoreBoard.teamInfo.awayScore));
  });

  app.post('/awayScore', (req: Request, res: Response) => {
    console.log('awayScore post Hit');

    if (req.query.decrement) global.scoreBoard.teamInfo.awayScore -= 1;
    else if (req.query.reset) global.scoreBoard.teamInfo.awayScore = 0;
    else global.scoreBoard.teamInfo.awayScore += 1;

    global.eventEmitter.emit(ScoreBoardEvent);
    return res.status(204).send();
  });
};
