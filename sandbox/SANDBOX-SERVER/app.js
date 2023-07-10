const express = require("express");
const app = express();
const chalk = require("chalk");

app.get("/user", (req, res, next) => {
  console.log(chalk.yellowBright("in post method!!!"));
  res.send({ name: "user", age: "55" });
});

app.post("/", (req, res, next) => {
  console.log(chalk.yellowBright("in post method!!!"));
  res.send([
    { name: "user", age: "54" },
    { name: "second", age: "3" },
  ]);
});

app.delete("/1", (req, res, next) => {
  console.log(chalk.yellowBright("in delete method!!!"));
  res.send("User deleted");
});

app.put("/2", (req, res, next) => {
  console.log(chalk.yellowBright("in put method!!!"));
  res.send("User was updated");
});

app.patch("/3", (req, res, next) => {
  console.log(chalk.yellowBright("in patch method!!!"));
  res.send("User liked a post");
});

const PORT = 8180;
app.listen(PORT, () =>
  console.log(chalk.yellowBright(`Listening on: http://localhost: ${PORT}`))
);
