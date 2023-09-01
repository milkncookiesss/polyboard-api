import pg from "pg";
import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config()
// const { DB_NAME, DB_PASSWORD, DB_USER } = process.env

console.log("wtf is this shit man??? ============> ", process.env.DB_NAME);

const sequelize = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
  host: "localhost",
  dialect: "postgres",
});

try {
  await sequelize.authenticate();
  console.log("Connection to DB is good.");
} catch (error) {
  console.error("Unable to connect to DB.", error);
}

export default sequelize;
