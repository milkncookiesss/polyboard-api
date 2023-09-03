import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getAllMigrations = async () => {
  const migrations = fs.readdirSync(__dirname + '/migrations');
  const dbMigrations = await db.query("SELECT * FROM `SequelizeMeta`", {
    type: Sequelize.QueryTypes.SELECT
  });
  const pendingMigrations = [], completedMigrations = []
  for (const migration of migrations) {
    const isExistsInDatabase = dbMigrations.find(({ name }) => name == migration)
    if (isExistsInDatabase) {
      completedMigrations.push(migration);
    } else {
      pendingMigrations.push(migration);
    }
  }

  console.log('-------------------> ', migrations);
  return { migraitons, completedMigrations, pendingMigrations };
}

const UpAllMigrations = async () => {
  const { pendingMigrations } = await getAllMigrations();
  const outPut = [];

  for (let i = 0, c = pendingMigrations.length; i < c; i++) {
    const migration = require(__dirname + '/../../migrations/' + pendingMigrations[i]);
    const result = await migration.up(db.queryInterface, Sequelize);
    outPut.push(result);
    await db.query("INSERT INTO `SequelizeMeta` VALUES(:name)", {
      type: Sequelize.QueryTypes.INSERT,
      replacements: {
        name: pendingMigrations[i]
      }
    })
  }

  return outPut;
}

export default { UpAllMigrations }
