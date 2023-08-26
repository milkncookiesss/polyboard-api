import express from "express";

const app = new express();

app
  .use(express.json())
  .use(express.urlencoded( { extended: true } ))

export default app;
