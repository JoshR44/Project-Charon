import 'dotenv/config';

import { BrowserWindow, app } from 'electron';

import { EventEmitter } from 'events';
import { ScoreBoardClockEvent, ScoreBoardClockRunningEvent, ScoreBoardEvent } from './constants/events';
import { serverStart } from './server/serverStart';

import path = require('node:path');

global.scoreBoard = {
  homeScore: 0,
  awayScore: 0,
  homeTeam: '',
  awayTeam: '',
  clock: '00:00',
  clockSeconds: 0,
  clockInterval: null,
  clockRunning: false,
};

const eventEmitter = new EventEmitter();
global.eventEmitter = eventEmitter;

const runElectron = () => {
  const createWindow = () => {
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js'),
      },
    });

    global.eventEmitter.on(ScoreBoardEvent, () => {
      console.log('Firing update_score_event mainWindow event');
      mainWindow.webContents.send(ScoreBoardEvent, global.scoreBoard);
    });

    global.eventEmitter.on(ScoreBoardClockEvent, () => {
      console.log('Firing update_clock_event mainWindow event');
      mainWindow.webContents.send(ScoreBoardClockEvent, global.scoreBoard.clock);
    });

    global.eventEmitter.on(ScoreBoardClockRunningEvent, () => {
      console.log('Firing update_clock_running_event mainWindow event');
      mainWindow.webContents.send(ScoreBoardClockRunningEvent, global.scoreBoard.clockRunning);
    });

    mainWindow.loadFile('src/html/index.html');
  };

  app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });
};

const runExpress = () => {
  serverStart();
};

if (process.env.RUN_ELECTRON === 'true') runElectron();
if (process.env.RUN_EXPRESS === 'true') runExpress();
