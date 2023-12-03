import { ScoreBoard } from './server/ScoreBoard';
import { ipcRenderer } from 'electron';

window.addEventListener('DOMContentLoaded', () => {
  const counter = document.getElementById('homeScore');
  ipcRenderer.on('updateHomeScore', (_event, scoreBoard: ScoreBoard) => {
    console.log('updateHomeScore Event invoked in preload');
    const oldValue = Number(counter.innerText);
    console.log(`Old Value: ${oldValue} - New Value: ${scoreBoard.homeScore}`);
    counter.innerText = scoreBoard.homeScore.toString();
  });
});
