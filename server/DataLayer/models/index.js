'use strict';

// const fs = require('fs');
// const path = require('path');

// const Sequelize = require('sequelize');
import Sequelize from 'sequelize';
// const process = require('process');

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
  sequelize = new Sequelize(process.env.DATABASE_URL, { dialectOptions: { ssl: {
      require: false,
      rejectUnauthorized: false // <<<<<<< YOU NEED THIS
      }
    },
    pool: {

    }
  });

  console.log(sequelize);
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

/**
 * db migration kind of janky but it is what it is for short period of time
 */
// import path from 'path';
// import fs from 'fs';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const getAllMigrations = async () => {
//   const migrations = fs.readdirSync(__dirname + '/../../../migrations');
//   const dbMigrations = await sequelize.query("SELECT * FROM SequelizeMeta", {
//     type: Sequelize.QueryTypes.SELECT
//   });
//   const pendingMigrations = [], completedMigrations = []
//   for (const migration of migrations) {
//     const isExistsInDatabase = dbMigrations.find(({ name }) => name == migration)
//     if (isExistsInDatabase) {
//       completedMigrations.push(migration);
//     } else {
//       pendingMigrations.push(migration);
//     }
//   }

//   console.log('-------------------> ', migrations);
//   return { migraitons, completedMigrations, pendingMigrations };
// }

// const UpAllMigrations = async () => {
//   const { pendingMigrations } = await getAllMigrations();
//   const outPut = [];

//   for (let i = 0, c = pendingMigrations.length; i < c; i++) {
//     const migration = require(__dirname + '/../../migrations/' + pendingMigrations[i]);
//     const result = await migration.up(db.queryInterface, Sequelize);
//     outPut.push(result);
//     await sequelize.query("INSERT INTO SequelizeMeta VALUES(:name)", {
//       type: Sequelize.QueryTypes.INSERT,
//       replacements: {
//         name: pendingMigrations[i]
//       }
//     })
//   }

//   return outPut;
// }


// UpAllMigrations();
/**
 * end of migration
 */

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
