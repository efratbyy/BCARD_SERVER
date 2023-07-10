const { bgYellowBright } = require("chalk");
console.log(bgYellowBright("In test.js!"));

/***** Query Params *****/
// ?key=value
// ?second=value2&key=value

const queryParams = {
  key: "value",
  second: "value2",
};

/***** Params *****/

// server side - url/:key
// client side - url/value

let params = {
  key: "value",
};
// server side - url/:key/:second
// client side - url/value/value2

params = {
  key: "value",
  second: "value2",
};

/**************** *****************/
// app.use(express.json());
// app.use(express.static("./public")); // public אומר שהתקייה הדיפולטיבית לקבלת קבצי תמונה/וידאו/אדיאו היא
// // public מאפשר גישה לקבלת קבצים מתקיית
// app.use(express.text());
// app.use(router); // router.js מתוך router זהו מיירט לכל הכתובות בכל המטודות שיפעיל את פונקציית
// const { errorHandler } = require("./sandbox/UTILS/errorHandler");

// app.get("/", (req, res) => {
//   console.log("in app.get!!!");
//   res.send(`
//   <!DOCTYPE html>
// <html lang="en">
// <head>
// 	<meta charset="utf-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0"">
// 	<title>express static</title>
// </head>
// <body>
// <h1>Giraffe Picture</h1>
// 	<img src="/assets/images/giraffe.jpg" alt="giraffe"/>
// </body>
// </html>
//   `);
// });

// app.post("/body", (req, res) => {
//   res.send(req.body);
// });

/******** error ********/

// app.get("/", (req, res) => {
//   try {
//     console.log("in app.get!!!");
//     throw new Error("testing error middleware!!!");
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

// app.use((err, req, res, next) => {
//   console.log(chalk.redBright(err.message));
//   res.status(500).send(err.message);
// });

// app.get("/", () => {
//   throw new Error("error in server");
// });

// או

// app.use((req, res, next) => {
//   throw new Error("error in server");
// });

// app.use((err, req, res, next) => {
//   console.log(chalk.redBright(err.message));
//   res.status(500).send(err.message);
// });

// router.get("/", (req, res) => {
//   console.log("in router get!");
//   res.send({ message: "in router get!!!" });
// });
/********* router *********/

// router.get("/message", (req, res) => {
//   // http://localhost:8180/cards/message נכתוב postman-ב
//   console.log("in router get!");
//   res.send({ message: "in router get!!!" });
// });

// router.post("/", (req, res) => {
//   console.log("in post!");
//   res.send("in post!!!");
// });

// app.use("/cards", router); // http://localhost:8180/cards נכתוב postman-ב
// // router אז תופעל הפונקציה של /cards-אם שורת הכתובת תתחיל ב

// router.use((error, req, res, next) => {
//   errorHandler(res, 500, error.message);
// });