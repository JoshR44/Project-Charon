export interface ScoreBoard {
  teamInfo: TeamInfo;
  clock: string;
  clockSeconds: number;
  clockInterval: NodeJS.Timeout;
  clockRunning: boolean;
  quarterLength: number;
}

export interface TeamInfo {
  homeScore: number;
  awayScore: number;
  homeTeam: string;
  awayTeam: string;
}
