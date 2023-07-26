const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("config");

const ENVIRONMENT = config.get("NODE_ENV");
const DB_NAME = config.get("DB_NAME");
const DB_PASSWORD = config.get("DB_PASSWORD");

if (ENVIRONMENT === "development")
  mongoose
    .connect(`mongodb://127.0.0.1:27017/BCard_efrat_benYosef`)
    .then(() =>
      console.log(
        chalk.magentaBright(
          "You have been Connected to MongoDB Locally Successfully!"
        )
      )
    )
    .catch((error) =>
      console.log(
        chalk.redBright(` Could not Connected to MongoDB Locally: ${error}`)
      )
    );

if (ENVIRONMENT === "production")
  mongoose
    .connect(
      `mongodb+srv://${DB_NAME}:${DB_PASSWORD}@efrat.a0lfqho.mongodb.net/BCard_efrat_benYosef`
    )
    .then(() =>
      console.log(
        chalk.magentaBright(
          "You have been Connected to MongoDB Atlas Successfully!"
        )
      )
    )
    .catch((error) =>
      console.log(
        chalk.redBright(` Could not Connected to MongoDB Atlas: ${error}`)
      )
    );
