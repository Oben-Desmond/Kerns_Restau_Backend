import dotenv from "dotenv";

const { Sequelize } = require("sequelize");

dotenv.config();

const { POSTGRESQL } = process.env;

const sequelize = new Sequelize(POSTGRESQL, {
  // logging: console.log,
});

async function testAuthentication() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:");
  }
}

testAuthentication();

export { sequelize };
