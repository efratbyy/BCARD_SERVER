const express = require("express");
const app = express();
const chalk = require("chalk");
const cors = require("cors");

// app.use(
//   cors({
//     origin: "http://127.0.0.1: 5500",
//     optionsSuccessStatus: 200,
//   })
// );

// app.use(
//   cors({
//     origin: ["http://127.0.0.1: 5502", "http://127.0.0.1: 5501"],
//     optionsSuccessStatus: 200,
//   })
// );

// app.use(cors());

// const allowedApis = ["http://127.0.0.1:5502", "http://127.0.0.1:5501"];

// const corsOptions = (req, callback) => {
//   let corsOptions;
//   console.log(allowedApis.indexOf(req.header("Origin")));
//   if (allowedApis.indexOf(req.header("Origin")) !== -1)
//     corsOptions = { origin: false };
//   else corsOptions = { origin: true };

//   callback(null, corsOptions);
// };

// const corsOptions =  (req, callback)=> {
//   let corsOptions;
//   if (allowedApis.indexOf(req.header("Origin")) !== -1)
//   {
//     corsOptions = { origin: true };
//   } else {
//     corsOptions = { origin: false };
//   }
//   callback(null, corsOptions);
// };

// app.use(cors(corsOptions));

// app.get("/", (req, res) => {
//   res.send({ message: "success" });
// });

const PORT = 7171;
app.listen(PORT, () =>
  console.log(chalk.blueBright(`Listening on: http://localhost: ${PORT}`))
);
