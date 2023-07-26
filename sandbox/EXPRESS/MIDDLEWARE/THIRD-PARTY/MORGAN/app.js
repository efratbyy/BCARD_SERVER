const express = require("express");
const app = express();
const chalk = require("chalk");
const morgan = require("morgan");

// app.use(morgan("tiny"));
// app.use(
//   morgan(":method :url :status :res[content-length] - :response-time ms")
// );
// app.use(morgan("dev"));

app.use(
  morgan((tokens, req, res) => {
    // console.log(tokens);
    if (tokens.method(req, res) === "GET") return "success!!!";

    // return `${tokens.method(req, res)} ${tokens.url(req, res)} ${tokens.status(req, res)} ${tokens["response-time"](req, res)} milliseconds` // דרך נוספת

    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);

// /******* דרך א׳ *******/
// app.use(
//   morgan(
//     chalk.cyanBright("[:date[clf]] :method :url :status :response-time ms")
//   )
// );

// /******* דרך ב׳ *******/
// app.use(
//   morgan((tokens, req, res) => {
//     return [
//       tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//       "-",
//       tokens["response-time"](req, res),
//     ].join(" ");
//   })
// );

const PORT = 7171;
app.listen(PORT, () =>
  console.log(chalk.blueBright(`Listening on: http://localhost: ${PORT}`))
);
