import { ScoreBoard } from './server/ScoreBoard';

declare global {
  namespace NodeJS {
    interface Global {
      scoreBoard: ScoreBoard;
      eventEmitter: EventEmitter;
    }
  }
}
