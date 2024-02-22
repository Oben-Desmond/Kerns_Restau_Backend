const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://djymgqym:7y6K3Z70FM4vkle-3KPSbHd6DQ1mZOpF@kandula.db.elephantsql.com/djymgqym",
  {
    // logging: console.log,
  }
);

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
