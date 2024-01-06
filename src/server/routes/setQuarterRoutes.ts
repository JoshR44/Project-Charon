import type { Express, Request, Response } from 'express';

import { ScoreBoardClockEvent } from '../../constants/events';

export const addSetQuarterRoutes = (app: Express) => {
  console.log('Adding away score routes');

  app.post('/setQuarter', (req: Request, res: Response) => {
    console.log(`setQuarter post Hit with query: ${req.query.quarter}`);

    const quarter = parseInt(req.query.quarter as string);

    global.scoreBoard.clockSeconds = quarter * global.scoreBoard.quarterLength;
    const minutes = Math.floor(global.scoreBoard.clockSeconds / 60);
    const seconds = global.scoreBoard.clockSeconds % 60;
    global.scoreBoard.clock = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    global.eventEmitter.emit(ScoreBoardClockEvent);
    return res.status(204).send();
  });

  app.post('/setQuarterLength', (req: Request, res: Response) => {
    console.log('setQuarterLength post Hit');

    const clockValue = req.query.clock as string;
    const timeComponents = clockValue.split(':');
    const minutes = parseInt(timeComponents[0]);
    const seconds = parseInt(timeComponents[1]);
    const clockValueInSeconds = minutes * 60 + seconds;

    global.scoreBoard.clock = clockValue;
    global.scoreBoard.clockSeconds = clockValueInSeconds;

    global.eventEmitter.emit(ScoreBoardClockEvent);
    return res.status(204).send();
  });
};
