import 'dotenv/config';

import { BrowserWindow, app } from 'electron';

import { serverStart } from './server/serverStart';

import path = require('node:path');

const runElectron = () => {
  const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
    });

    win.loadFile('src/html/index.html');
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
