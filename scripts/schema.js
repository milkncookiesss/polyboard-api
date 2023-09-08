import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Sequelize from 'sequelize';
import dotenv from "dotenv";

dotenv.config()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const importSchema = async () => {
  console.log('Schema import running')
  var sql_string = fs.readFileSync(__dirname+'/../migrations/schema/schema.sql', 'utf8')
  // config.dialectOptions = {
  //   multipleStatements: true
  // }
  console.log('going for connect');
  const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  })
  console.log('connected to db for sql dump');
  sequelize.query(sql_string)
  .then((results) => {
    
    console.log('*************************')
    console.log(results)
    console.log('Schema import successful')
    process.exit(0)
  })
  .catch((err) => {
    if (err.message.includes('already exists')) {
      console.log('*************************')
      console.log('Schema import skipped. Already exists.')
      process.exit(0) 
    }
    console.log('*************************')
    console.log('Schema import failed. Error:', err.message)
    process.exit(1) 
  })
}

importSchema()
