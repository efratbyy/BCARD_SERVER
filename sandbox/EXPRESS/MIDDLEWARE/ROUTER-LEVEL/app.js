const express = require("express");
const app = express();
const chalk = require("chalk");
const router = express.Router();

const getMessage = (req, res) => {
  console.log("in router get!");
  res.send({ message: "in router get!!!" });
};

router.get("/message", getMessage);

router.post("/test", (req, res) => {
  console.log("in post");
  res.send("in post!!");
});

app.use("/cards", router);
app.use("/users", router);

const PORT = 8180;
app.listen(PORT, () =>
  console.log(chalk.blueBright(`Listening on: http://localhost:${PORT}`))
);
