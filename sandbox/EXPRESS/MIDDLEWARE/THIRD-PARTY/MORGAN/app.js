// MORGAN - http-מציג את בקשות ה
// npm i morgan

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
//     // :url - אובייקט שיכיל את המטודות, כמו לדוגמא - tokens
//     // אובייקט הבקשה - req
//     // אובייקט התגובה - res
//     return [
//       // הפונקציה מחזירה מערך של מחרוזת תווים
//       // מחזירה מחרוזת תווים tokens-כל מטודה של ה
//       // כל אחת מהשורות הבאות זה איבר במערך
//       tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//       "-",
//       tokens["response-time"](req, res), // tokens-באובייקט ה response-time ניגש למפתח
//       "ms",
//     ].join(" "); // מחבר את כל מחרוזות התווים ומוסיף בניהם רווחים
//     // שעובדת עם מערכים js זוהי מטודה של join
//   })
// ); // הופכת את מערך מחרוזות התווים למחרוזת תווים אחת ומדפיסה אותה בקונסול morgan הפונקציה
// // POST / 404 - 3.257 ms :התוצאה בקונסול

const PORT = 7171;
app.listen(PORT, () =>
  console.log(chalk.blueBright(`Listening on: http://localhost: ${PORT}`))
);
