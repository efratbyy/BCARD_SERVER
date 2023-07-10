// const express = require("express");
// const app = express();
const chalk = require("chalk");
// app.use(express.json());

const handleError = (res, status = 400, message = "Page Not Found!") => {
  console.log(chalk.redBright(message));
  return res.status(status).send(message);
};

// app.use((req, res, next) => {
//   throw new Error("error in server");
// });

// app.use((err, req, res, next) => {
//   console.log(chalk.redBright(err.message));
//   res.status(500).send(err.message);
// });

exports.handleError = handleError;
