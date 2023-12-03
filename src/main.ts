import 'dotenv/config';

import { BrowserWindow, app } from 'electron';

import { EventEmitter } from 'events';
import { serverStart } from './server/serverStart';

import path = require('node:path');

global.scoreBoard = {
  homeScore: 0,
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

    global.eventEmitter.on('updateHomeScore', () => {
      console.log('Firing updateHomeScore mainWindow event');
      mainWindow.webContents.send('updateHomeScore', global.scoreBoard);
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
