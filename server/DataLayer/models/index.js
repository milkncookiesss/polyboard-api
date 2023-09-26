'use strict';

import Sequelize from 'sequelize';

import config from '../../../config/config.json' assert { type: 'json' };
console.log('=========================================================');
console.log('entering db load');
console.log('=========================================================');


import dotenv from 'dotenv';
dotenv.config();

const env = process.env.NODE_ENV || 'development';


import User from './user.js';
import Problem from './problem.js';
import Send from './send.js';
import Report from './report.js';

let sequelize;
if (process.env.DATABASE_URL) {
  console.log('has db url attached');
  sequelize = new Sequelize(process.env.DATABASE_URL, { dialectOptions: { ssl: {
      require: false,
      rejectUnauthorized: false // <<<<<<< YOU NEED THIS
      }
    },
    pool: {

    }
  });

} else {
  console.log('no db url')
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    port: process.env.SEQUELIZE_PORT,
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
  Problem: Problem.init(sequelize, Sequelize),
  Send: Send.init(sequelize, Sequelize),
  Report: Report.init(sequelize, Sequelize)
}

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
