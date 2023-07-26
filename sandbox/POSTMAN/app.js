const express = require("express");
const page = require("./pageExe");
const app = express();

app.use(express.json());

app.get("/headers", (req, res) => {
  console.log("In Headers", req.headers);
  res.send("in headers");
});

app.get("/params/:key/:second", (req, res) => {
  console.log("In Params", req.params);
  res.send("in params");
});

app.get("/query", (req, res) => {
  console.log("In Query Params", req.query);
  res.send("In query params");
});

app.get("/body", (req, res) => {
  console.log(req.body);
  res.header({ my_header: "david" });
  res.send("In body!");
});

app.get("/html", (req, res) => {
  res.send(page);
});

const PORT = 5151;
app.listen(PORT, () => console.log(`Listening on: http://localhost: ${PORT}`));
