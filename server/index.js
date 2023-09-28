import express from "express";

import problemsRouter from './Api/problems.js';
import usersRouter from './Api/users.js';
import deepLinkRouter from './Api/deeplink.js';

const app = new express();

app
  .use(express.json())
  .use(express.urlencoded( { extended: true } ))
  .use('/api', deepLinkRouter)
  .use('/api', problemsRouter)
  .use('/api', usersRouter)
  // .get('/test', (req, res) => {
  //   console.log('testing to see if we actually get here');
  //   res.send('hi im here').status(200);
  // })

export default app;
