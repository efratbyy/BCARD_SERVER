const express = require("express");
const app = express();
const cors = require("cors");
const chalk = require("chalk");

const authorizedAPIs = [
  "http://127.0.0.1:5500",
  "http://127.0.0.1:3000",
  "http://localhost:3000",
  "http://localhost:8180",
];

const options = (req, callback) => {
  const isExists = authorizedAPIs.find((api) => api === req.headers.origin);
  if (!isExists)
    return callback(
      chalk.redBright(
        `CORS Error: the API ${req.headers.origin} is an Unauthorized API`
      ),
      {
        origin: false,
      }
    );
  callback(null, { origin: true });
};

app.use(
  cors({
    origin: true,
  })
);

module.exports = app;
