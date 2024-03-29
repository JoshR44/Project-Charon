import type { Express, Request, Response } from 'express';

import { ScoreBoardEvent } from '../../constants/events';
import { setHtmlResponse } from '../setHtmlResponse';

export const addTeamsRoutes = (app: Express) => {
  console.log('Adding teams score routes');

  app.get('/homeTeam', (_req: Request, res: Response) => {
    console.log('homeTeam get Hit');
    return res.status(200).send(setHtmlResponse(global.scoreBoard.teamInfo.homeTeam));
  });

  app.get('/awayTeam', (_req: Request, res: Response) => {
    console.log('awayTeam get Hit');
    return res.status(200).send(setHtmlResponse(global.scoreBoard.teamInfo.awayTeam));
  });

  app.post('/updateTeams', (req: Request, res: Response) => {
    console.log('updateTeams post Hit');

    global.scoreBoard.teamInfo.homeTeam = req.query.homeTeam;
    global.scoreBoard.teamInfo.awayTeam = req.query.awayTeam;

    global.eventEmitter.emit(ScoreBoardEvent);
    return res.status(204).send();
  });
};
