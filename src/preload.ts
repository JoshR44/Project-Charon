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

const setupSetClockButtonListener = () => {
  const button = document.getElementById('setClockButton');
  button.addEventListener('click', () => {
    const clockInputMinutes = <HTMLInputElement>document.getElementById('setClockMinutes');
    const clockInputSeconds = <HTMLInputElement>document.getElementById('setClockSeconds');
    fetch(fullUrl(`setClock?clock=${clockInputMinutes.value}:${clockInputSeconds.value}`), {
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

  setupButtonListener('clockStartButton', 'startClock');
  setupButtonListener('clockStopButton', 'stopClock');

  setupButtonListener('setQ1Button', 'setQuarter?quarter=0');
  setupButtonListener('setQ2Button', 'setQuarter?quarter=1');
  setupButtonListener('setQ3Button', 'setQuarter?quarter=2');
  setupButtonListener('setQ4Button', 'setQuarter?quarter=3');
  setupButtonListener('setQ5Button', 'setQuarter?quarter=4');

  setupUpdateTeamsButtonListener();

  setupSetClockButtonListener();

  ipcRenderer.on('update_scoreboard_event', (_event, scoreBoard: ScoreBoard) => {
    console.log('updateScoreBoard Event invoked in preload');
    counters.forEach((counter) => {
      counter.innerText = scoreBoard[counter.id].toString();
    });
  });

  ipcRenderer.on('update_clock_event', (_event, scoreBoardClock: string) => {
    console.log('updateClock Event invoked in preload');
    const clock = document.getElementById('clock');
    clock.innerText = scoreBoardClock.toString();
  });

  ipcRenderer.on('update_clock_running_event', (_event, scoreBoardClockRunning: boolean) => {
    console.log('updateClockRunning Event invoked in preload');
    const clockStatus = document.getElementById('clockStatus');
    clockStatus.innerText = scoreBoardClockRunning ? '(Running)' : '(Stopped)';
  });

  ipcRenderer.on('update_quarter_length_event', (_event, scoreBoardQuarterLength: number) => {
    console.log('updateQuarterLength Event invoked in preload');
    const quarterLength = document.getElementById('quarterLength');
    const minutes = Math.floor(scoreBoardQuarterLength / 60);
    const seconds = scoreBoardQuarterLength % 60;
    quarterLength.innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  });
});
