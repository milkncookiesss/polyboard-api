'use strict';

// const fs = require('fs');
import fs from 'fs';
// const path = require('path');
import path from 'path';
// const Sequelize = require('sequelize');
import Sequelize from 'sequelize';
// const process = require('process');
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // console.log('========> ',__dirname);

// // const configPath = __dirname + '/../../config';
import config from '../../../config/config.json' assert { type: 'json' };
console.log('=========================================================');
console.log('entering db load');
console.log('=========================================================');


import dotenv from 'dotenv';
dotenv.config();
// const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// const db = {};
// const config = require(__dirname + '/../config/config.json')[env];
// import config from __dirname + '/../config/config';

import User from './user.js';
import Problem from './problem.js';

let sequelize;
if (process.env.DATABASE_URL) {
  console.log('has db url attached');
  const userName = process.env.DB_USER;
  const dbName = process.env.DB_NAME;
  sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  console.log('no db url')
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    port: 5433,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // <<<<<<< YOU NEED THIS
      }
    },
    pool: {
      max: 100,
      min: 0,
      idle: 200000,
      // @note https://github.com/sequelize/sequelize/issues/8133#issuecomment-359993057
      acquire: 1000000,
    }
  });
}

const models = {
  User: User.init(sequelize, Sequelize),
  Problem: Problem.init(sequelize, Sequelize)
}
// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

Object.values(models)
      .filter((model) => typeof model.associate === "function")
      .forEach((model) => model.associate(models));

const db = {
  ...models,
  sequelize: sequelize,
  Sequelize: Sequelize,
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
