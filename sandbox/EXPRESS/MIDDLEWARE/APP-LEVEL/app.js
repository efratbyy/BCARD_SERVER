// const express = require("express");
// const app = express();
// const chalk = require("chalk");

// app.use((req, res, next) => {
//   console.log(chalk.yellowBright("in first app.use!"));
//   res.send("in app.use!!!");
// });

// app.use("/", (req, res, next) => {
//   console.log(chalk.yellowBright("in second app.use!"));
//   res.send({ message: "i ended the req res cycle!!!!" });
// });

// const fn = (path = "/", cb, ...middleware) => {};

/****** app.use next *****/
// app.use(
//   "/",
//   (req, res, next) => {
//     console.log(chalk.yellowBright("one"));
//     next();
//   },
//   (req, res, next) => {
//     console.log(chalk.redBright("two"));
//     next();
//   },
//   (req, res) => {
//     console.log(chalk.magentaBright("three"));
//     res.send("end of cycle!");
//   }
// );

/***** express app middleware exe *****/

// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("first CB");
//     req.user = { first: "jon", last: "dho" };
//     next();
//   },
//   (req, res) => {
//     console.log("second CB");
//     res.send(req.user);
//   }
// );

/****** middleware method beside app.use *****/
// app.get("/", (req, res, next) => {
//   console.log(chalk.yellowBright("in get method!!!"));
//   res.send("in get!");
// });

// app.get("/", (req, res, next) => {
//   console.log(chalk.yellowBright("in get second method!!!"));
//   res.send("in get second!");
// });

// app.post("/", (req, res, next) => {
//   console.log(chalk.yellowBright("in post method!!!"));
//   res.send("in post");
// });

// app.put("/", (req, res, next) => {
//   console.log(chalk.yellowBright("in put method!!!"));
//   res.send("in put");
// });

// app.patch("/", (req, res, next) => {
//   console.log(chalk.yellowBright("in patch method!!!"));
//   res.send("in patch");
// });

// app.delete("/", (req, res, next) => {
//   console.log(chalk.yellowBright("in delete method!!!"));
//   res.send("in delete");
// });

/***** response *****/
/***** res.send *****/
// app.use("/", (req, res) => {
//   res.send("testing!!!!");
// res.send({ key: "value" });
//   res.send(["one", "two", "three"]);
//   res.send(false);
//   res.send(503);
//   res.send(null);
// });

// app.use((req, res) => {
// res.json({ key: "value" });
// res.json("text");
// res.json(false);
// });

/***** res.status *****/
// app.use((req, res) => {
//   console.log("in req status!");
//   res.status(401).send("end cycle!");
// });

/***** request *****/

// app.use("/headers", (req, res) => {
//   const headers = req.headers;
//   res.send(headers);
// });

// app.use("/params/:david", (req, res) => {
//   const params = req.params;
//   res.send(params);
// });

// app.use("/query-params", (req, res) => {
//   const query_params = req.query;
//   res.send(query_params);
// });

// const test = (req, res, next) => {
//   console.log("in req body!!!!");
//   const body = req.body;
//   // res.send(body);
//   next();
// };

// app.use(test);

// const PORT = 9191;
// app.listen(PORT, () => {
//   console.log(chalk.blueBright(`Listening on :http://localhost:${PORT}`));
// });

/*************** ****************/
// const express = require("express");
// const app = express();
// const chalk = require("chalk");

// app.use(express.json());
// app.use("/", express.text());

// app.use((req, res, next) => {
//   console.log(chalk.yellowBright("in first app.use!"));
//   res.send("in app.use!!!");
// });

// app.use("/", (req, res, next) => {
//   console.log(chalk.yellowBright("in second app.use!"));
//   res.send({ message: "i ended the req res cycle!!!!" });
// });

/****** app.use next *****/
// app.use(
//   "/",
//   (req, res, next) => {
//     console.log(chalk.yellowBright("one"));
//     next();
//   },
//   (req, res, next) => {
//     console.log(chalk.redBright("two"));
//     next();
//   },
//   (req, res) => {
//     console.log(chalk.magentaBright("three"));
//     res.send("end of cycle!");
//   }
// );

/***** express app middleware exe *****/

// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("first CB");
//     req.user = { first: "jon", last: "dho" };
//     next();
//   },
//   (req, res) => {
//     console.log("second CB");
//     res.send(req.user);
//   }
// );

/****** middleware method beside app.use *****/
// app.get("/", (req, res, next) => {
//   console.log(chalk.yellowBright("in get method!!!"));
//   res.send("in get!");
// });

// app.get("/", (req, res, next) => {
//   console.log(chalk.yellowBright("in get second method!!!"));
//   res.send("in get second!");
// });

// app.post("/", (req, res, next) => {
//   console.log(chalk.yellowBright("in post method!!!"));
//   res.send("in post");
// });

// app.put("/", (req, res, next) => {
//   console.log(chalk.yellowBright("in put method!!!"));
//   res.send("in put");
// });

// app.patch("/", (req, res, next) => {
//   console.log(chalk.yellowBright("in patch method!!!"));
//   res.send("in patch");
// });

// app.delete("/", (req, res, next) => {
//   console.log(chalk.yellowBright("in delete method!!!"));
//   res.send("in delete");
// });

/***** response *****/
/***** res.send *****/
// app.use("/", (req, res) => {
//   res.send("testing!!!!");
//   res.send({ key: "value" });
//     res.send(["one", "two", "three"]);
//     res.send(false);
//     res.send(503);
//     res.send(null);
// });

// app.use((req, res) => {
//   res.json({ key: "value" });
//   res.json("text");
//   res.json(false);
// });

/***** res.status *****/
// app.use((req, res) => {
//   console.log("in req status!");
//   res.status(401).send("end cycle!");
// });

/***** request *****/

// app.use("/headers", (req, res) => {
//   const headers = req.headers;
//   const query_params = req.query;
//   console.log(query_params);
//   res.send({ headers, query_params });
// });

// app.use("/params/:david", (req, res) => {
//   const params = req.params;
//   const query_params = req.query;
//   console.log(query_params);
//   res.send(params);
// });

// // http://localhost:9191/headers?waw=waw!!!!!
// app.use("/query-params", (req, res) => {
//   const query_params = req.query;
//   res.send(query_params);
// });

// const test = (req, res, next) => {
//   console.log("in request body!!!");
//   const body = req.body;
//   // res.send(body);
//   next();
// };
// app.use(test);

// app.use("/", express.json());

// app.use("/body", (req, res) => {
//   res.send(req.body);
// });

app.use("/headers", (req, res) => {
  const headers = req.headers;
  res.send(headers);
});

app.use("/params/:id", (req, res) => {
  const params = req.params;
  res.send(params);
});

app.use("/query", (req, res) => {
  const query = req.query;
  res.send(query);
});

app.use("/body", (req, res) => {
  const body = req.body;
  res.send(body);
});

app.use("/user", (req, res) => {
  req.user = { first: "Efrat", last: "Ben Yosef" };
  const user = req.user;
  res.send(user);
});

const PORT = 9191;
app.listen(PORT, () => {
  console.log(chalk.blueBright(`Listening on :http://localhost:${PORT}`));
});
