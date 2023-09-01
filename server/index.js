import express from "express";

import problemsRouter from './Api/problems.js';

const app = new express();

app
  .use(express.json())
  .use(express.urlencoded( { extended: true } ))
  .use('/api', problemsRouter)
  // .get('/test', (req, res) => {
  //   console.log('testing to see if we actually get here');
  //   res.send('hi im here').status(200);
  // })

export default app;
