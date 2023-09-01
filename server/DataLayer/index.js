import pg from "pg";
import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config()

let sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, 
    {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    }
  );
} else {
  sequelize = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
    host: "localhost",
    dialect: "postgres",
  });
}

try {
  await sequelize.authenticate();
  console.log("Connection to DB is good.");
} catch (error) {
  console.error("Unable to connect to DB.", error);
}

export default sequelize;
