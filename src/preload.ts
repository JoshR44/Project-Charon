import { ScoreBoard } from './server/ScoreBoard';
import { ipcRenderer } from 'electron';

const counters: Array<HTMLElement> = [];

const fullUrl = (route: string): string => {
  const url = 'http://localhost';
  return `${url}/${route}`;
};

const setupButtonListener = (buttonName: string, route: string) => {
  const button = document.getElementById(buttonName);
  button.addEventListener('click', () => {
    fetch(fullUrl(route), {
      method: 'POST',
    });
  });
};

const setupUpdateTeamsButtonListener = () => {
  const button = document.getElementById('updateTeamNamesButton');
  button.addEventListener('click', () => {
    const homeTeamInput = <HTMLInputElement>document.getElementById('hTeam');
    const awayTeamInput = <HTMLInputElement>document.getElementById('aTeam');
    fetch(fullUrl(`updateTeams?homeTeam=${homeTeamInput.value}&awayTeam=${awayTeamInput.value}`), {
      method: 'POST',
    });
  });
};

window.addEventListener('DOMContentLoaded', () => {
  counters.push(document.getElementById('homeScore'));
  counters.push(document.getElementById('awayScore'));
  counters.push(document.getElementById('homeTeam'));
  counters.push(document.getElementById('awayTeam'));

  setupButtonListener('homeScoreAddButton', 'homeScore');
  setupButtonListener('homeScoreRemoveButton', 'homeScore?decrement=true');
  setupButtonListener('homeScoreResetButton', 'homeScore?reset=true');

  setupButtonListener('awayScoreAddButton', 'awayScore');
  setupButtonListener('awayScoreRemoveButton', 'awayScore?decrement=true');
  setupButtonListener('awayScoreResetButton', 'awayScore?reset=true');

  setupUpdateTeamsButtonListener();

  ipcRenderer.on('update_scoreboard_event', (_event, scoreBoard: ScoreBoard) => {
    console.log('updateScoreBoard Event invoked in preload');
    counters.forEach((counter) => {
      counter.innerText = scoreBoard[counter.id].toString();
    });
  });
});
