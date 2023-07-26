const express = require("express");
const app = express();
const chalk = require("chalk");

// app.use(
//   "/user",
//   (req, res, next) => {
//     req.user = { first: "Efrat", last: "Ben Yosef" };
//     console.log(chalk.yellowBright("In first CB"));
//     next();
//   },
//   (req, res) => {
//     console.log(chalk.magentaBright("Efrat Ben Yosef"));
//     res.send(req.user);
//   }
// );

/****** middleware method beside app.use *****/
// app.get("/", (req, res, next) => {
//   console.log(chalk.yellowBright("in get method!!!"));
//   res.send("in get!");
// });

// app.get("/", (req, res, next) => {
//   console.log(chalk.yellowBright("in get method!!!"));
//   res.send("in second get!");
// });

// app.post("/", (req, res, next) => {
//   console.log(chalk.yellowBright("in post method!!!"));
//   res.send("in post!");
// });

// app.put("/", (req, res, next) => {
//   console.log(chalk.yellowBright("in put method!!!"));
//   res.send("in put!");
// });

// app.patch("/", (req, res, next) => {
//   console.log(chalk.yellowBright("in patch method!!!"));
//   res.send("in patch!");
// });

// app.delete("/", (req, res, next) => {
//   console.log(chalk.yellowBright("in delete method!!!"));
//   res.send("in delete!");
// });

/***** response *****/
/***** res.send *****/
// app.use((req, res) => {
//   //   res.send("testing!!!");
//   //   res.send({ key: "value" });
//   //   res.send(["one", "two", "three"]);
//   //   res.send(false);
//   //   res.send(400);
// //   res.send(null);
// });

/***** res.status *****/
app.use((req, res) => {
  console.log("in req status!");
  res.status(401).send("end cycle!");
});

const PORT = 9191;
app.listen(PORT, () =>
  console.log(chalk.blueBright(`Listening on: http://localhost: ${PORT}`))
);
