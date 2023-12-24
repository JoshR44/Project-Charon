export interface ScoreBoard {
  homeScore: number;
  awayScore: number;
  homeTeam: string;
  awayTeam: string;
  clock: string;
  clockSeconds: number;
  clockInterval: NodeJS.Timeout;
  clockRunning: boolean;
}
