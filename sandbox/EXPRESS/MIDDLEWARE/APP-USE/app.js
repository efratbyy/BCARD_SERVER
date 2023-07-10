const express = require("express");
const app = express();
const chalk = require("chalk");

const PORT = 64000;
app.listen(PORT, () =>
  console.log(chalk.blueBright(`Listening on: http://localhost: ${PORT}`))
);

app.use(
  (req, res, next) => {
    console.log(chalk.yellowBright("In first app.use!"));
    req.user = "david";
    console.log(req.user);
    // res.send({message: "I ended the req res cycle!!!"});
    next();
  },
  (req, res) => {
    console.log(req.user);
    console.log(chalk.yellowBright("In second method in app.use!"));
    res.send("end of cycle");
  }
);

app.use("/", (req, res, next) => {
  console.log(chalk.yellowBright("In second app.use!"));
  next();
  res.send("bla bla");
});
