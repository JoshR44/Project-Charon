import express from 'express';

// const html = `<!DOCTYPE html>
// <html>
//   <head>
//   </head>
//   <body>
//     <h1>Hello World!</h1>
//   </body>
// </html>`;

export const serverStart = async (): Promise<void> => {
  const app = express();

  app.get('/homeScore', (_req: express.Request, res: express.Response) => {
    console.log('homeScore Route Hit');
    return res.status(200).send('TEst World');
  });

  app.listen(80, () => console.log('Express server started'));
};
