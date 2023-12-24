import type { Express, Request, Response } from 'express';

import { ScoreBoardClockEvent, ScoreBoardClockRunningEvent } from '../../constants/events';
import { setHtmlResponse } from '../setHtmlResponse';

export const addClockRoutes = (app: Express) => {
  console.log('Adding clock routes');

  app.get('/clock', (_req: Request, res: Response) => {
    console.log('clock get Hit');
    return res.status(200).send(setHtmlResponse(global.scoreBoard.clock));
  });

  app.post('/setClock', (req: Request, res: Response) => {
    console.log('setClock post Hit');

    global.scoreBoard.clock = req.query.clock;

    global.eventEmitter.emit(ScoreBoardClockEvent);
    return res.status(204).send();
  });

  app.post('/startClock', (_req: Request, res: Response) => {
    console.log('startClock post Hit');
    if (global.scoreBoard.clockRunning) {
      console.log('Clock already running');
      return res.status(204).send();
    }

    global.scoreBoard.clockInterval = setInterval(() => {
      global.scoreBoard.clockSeconds++;
      const minutes = Math.floor(global.scoreBoard.clockSeconds / 60);
      const seconds = global.scoreBoard.clockSeconds % 60;
      global.scoreBoard.clock = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      global.eventEmitter.emit(ScoreBoardClockEvent);
    }, 1000);
    global.scoreBoard.clockRunning = true;
    global.eventEmitter.emit(ScoreBoardClockRunningEvent);

    return res.status(204).send();
  });

  app.post('/stopClock', (_req: Request, res: Response) => {
    console.log('stopClock post Hit');
    if (!global.scoreBoard.clockRunning) {
      console.log('Clock already stopped');
      return res.status(204).send();
    }

    clearInterval(global.scoreBoard.clockInterval);
    global.scoreBoard.clockRunning = false;
    global.eventEmitter.emit(ScoreBoardClockRunningEvent);

    return res.status(204).send();
  });
};
