const express = require("express");
const app = express();
const chalk = require("chalk");
const mongoose = require("mongoose");
const lodash = require("lodash");

app.use(express.json());

const PORT = 8989;
app.listen(PORT, () => {
  console.log(chalk.blueBright(`Listening on: http://localhost:${PORT}`));
  mongoose
    .connect("mongodb://127.0.0.1:27017/mongoose-sandbox")
    .then(() => console.log(chalk.magentaBright("connected to MongoDb!")))
    .catch((error) =>
      console.log(
        chalk.redBright.bold(`could not connect to mongoDb: ${error}`)
      )
    );
});

const handleError = (res, error) => {
  console.log(chalk.redBright(`Mongoose Error: ${error.message}`));
  res.status(400).send(`Mongoose Error: ${error.message}`);
};

/******* basic schema *******/
// const schema = new mongoose.Schema({});

/******* Schema Value Types *******/
// const schema = new mongoose.Schema({
//   string: String,
//   number: Number,
//   bool: Boolean,
//   date: Date,
//   id: mongoose.Types.ObjectId,
//   array: [String],
// });

/******* Schema in Schema *******/
// const nameSchema = new mongoose.Schema({
//   first: String,
//   last: String
// });

// const schema = new mongoose.Schema({
//   name: nameSchema
// });

/******* Schema validate key *******/
// const schema = new mongoose.Schema({
//   title: {
//     type: String,
//     trim: true,
//     lowercase: true,
//     minLength: 2,
//     maxLength: 256,
//     default: "did not enter title",
//     required: true,
//   },
//   subtitle: {
//     type: Number,
//     trim: true,
//   },
// });

/******* Schema unique key *******/
// const schema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

/******* Schema validate regex *******/
// const schema = new mongoose.Schema({
//   password: {
//     type: String,
//     match: RegExp(
//       /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
//     ),
//     required: true,
//   },
// });

// const schema = new mongoose.Schema({
//   string: String,
//   number: Number,
//   bool: Boolean,
//   date: { type: Date, default: Date.now },
// });

/***** mongoose queries *****/

const schema = new mongoose.Schema({
  first: String,
  last: String,
  age: Number,
  isBusiness: Boolean,
  date: { type: Date, default: Date.now },
});

const Test = mongoose.model("test", schema, "tests");
// const Test = mongoose.model("test", schema);

app.post("/", async (req, res) => {
  try {
    const dataFromReqBody = req.body;
    const user = new Test(dataFromReqBody);
    await user.save();
    return res.send(user);
  } catch (error) {
    console.log(chalk.redBright(`Mongoose Schema Error: ${error.message}`));
    res.status(400).send(error.message);
  }
});

/******* find query ********/
app.get("/", async (req, res) => {
  try {
    const instance = await Test.find();
    res.send(instance);
  } catch (error) {
    handleError(res, error);
  }
});

// https://mongoosejs.com/docs/queries.html#queries
app.get("/query", async (req, res) => {
  try {
    const instance = await Test.find({ number: { $gte: 2, $lt: 4 } });
    // const instance = await Test.find({ number: { $gte: 2, $lt: 4 }, bool: false });
    // :סוגים שונים של אופרטורים
    // $eq - equal
    // $ns - not equal
    // $gt - greater then
    // $gte - greater then or equal
    // $lt - lower then
    // $lte - lower then or equal
    res.send(instance);
  } catch (error) {
    handleError(res, error);
  }
});

/******* filter ********/
app.get("/filter", async (req, res) => {
  try {
    const instance = await Test.find(
      { number: { $gte: 2, $lt: 4 } },
      { string: 1, _id: 0 }
    );
    res.send(instance);
  } catch (error) {
    handleError(res, error);
  }
});

/******* query - find one - params - מחזיר אובייקט ********/
app.get("/find-one/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const isExist = await Test.findOne({ _id: id });
    if (!isExist) throw new Error("No item was found with this ID number");
    res.send(isExist);
  } catch (error) {
    handleError(res, error);
  }
});

/******* exe 1-a *******/
app.get("/users", async (req, res) => {
  try {
    const instance = await Test.find({ age: { $lte: 18 } }, { _id: 1 });
    res.send(instance);
  } catch (error) {
    handleError(res, error);
  }
});

/******* exe 1-b - query params *******/
app.get("/find-user/last", async (req, res) => {
  try {
    const { last } = req.query;
    const isExist = await Test.findOne({ last }, { first: 1, _id: 0 });
    if (!isExist) throw new Error("Did not found an item with this last name");
    res.send(isExist);
  } catch (error) {
    handleError(res, error);
  }
});

/************* find מטודות שניתן לשרשר למטודה *************/

/********* count *********/
app.get("/count", async (req, res) => {
  try {
    const instance = await Test.find({}).count();
    res.send({ "Numbers Of Items": instance });
  } catch (error) {
    handleError(res, error);
  }
});

/********* select *********/
app.get("/select", async (req, res) => {
  try {
    const instance = await Test.find({}).select(["first", "last", "-_id"]);
    res.send(instance);
  } catch (error) {
    handleError(res, error);
  }
});

/********* sort *********/
app.get("/sort", async (req, res) => {
  try {
    const instance = await Test.find({}).sort({ age: -1 });
    res.send(instance);
  } catch (error) {
    handleError(res, error);
  }
});

/********* sort and select *********/
app.get("/select-sort", async (req, res) => {
  try {
    const instance = await Test.find({})
      .select(["first", "-_id"])
      .sort({ age: -1 });
    res.send(instance);
  } catch (error) {
    handleError(res, error);
  }
});

/******** findById *********/
app.get("/findById/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Test.findById(id);
    console.log(user);
    if (!user) throw new Error("No item was found with this ID number");
    res.send(user);
  } catch (error) {
    handleError(res, error);
  }
});

/******** findById and update *********/
app.put("/findByIdAndUpdate/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.body;
    const userFromDB = await Test.findByIdAndUpdate(id, user, { new: true });
    if (!userFromDB) throw new Error("No user found with this ID number");
    res.send(userFromDB);
  } catch (error) {
    handleError(res, error);
  }
});

/******** findById and delete *********/
app.delete("/findByIdAndDelete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUserFromDB = await Test.findByIdAndDelete(id);
    if (!deletedUserFromDB)
      throw new Error("No item was found with this ID number");
    res.send(deletedUserFromDB);
  } catch (error) {
    handleError(res, error);
  }
});

// const deleteItemSchema = new mongoose.Schema({
//   first: String,
//   last: String,
//   age: Number,
//   isBusiness: Boolean,
//   date: Date,
// });

// const Deleted = mongoose.model("deleted", deleteItemSchema);

// app.delete("/findByIdAndDelete/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedUserFromDB = await Test.findByIdAndDelete(id);
//     if (!deletedUserFromDB) throw new Error("Did not found user with this id");

//     const normalizedUserForArchive = lodash.pick(
//       deletedUserFromDB,
//       "first",
//       "last",
//       "age",
//       "date",
//       "isBusiness"
//     );

//     const archivedTest = new Deleted(normalizedUserForArchive);
//     const archivedFromDB = await archivedTest.save();
//     res.send(archivedFromDB);
//   } catch (error) {
//     handleError(res, error);
//   }
// });

/******* exe 2-a *******/
app.put("/findByIdAndUpdateExe/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.body;
    const userFromDB = await Test.findByIdAndUpdate(id, user, { new: true });
    if (!userFromDB) throw new Error("No item was found with this ID number");
    res.send(userFromDB);
  } catch (error) {
    handleError(res, error);
  }
});

/******* exe 2-b *******/
app.delete("/findByIdAndDeleteExe/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUserFromDB = await Test.findByIdAndDelete(id);
    if (!deletedUserFromDB)
      throw new Error("No item was found with this ID number");
    res.send(deletedUserFromDB);
  } catch (error) {
    handleError(res, error);
  }
});

/******* exe 2-c *******/
app.get("/select-sort-exe", async (req, res) => {
  try {
    const instance = await Test.find({})
      .select(["last", "-_id"])
      .sort({ last: 1 });
    res.send(instance);
  } catch (error) {
    handleError(res, error);
  }
});

/******** unique number ********/
const generateUniqueNumber = async () => {
  try {
    const random = lodash.random(1, 3);
    console.log("random", random);
    const isExist = await Test.findOne({ age: random }, { age: 1, _id: 0 });
    console.log("isExist", isExist);
    if (isExist) return generateUniqueNumber();
    return Promise.resolve(random);
  } catch (error) {
    return Promise.reject(`Mongoose Error: ${error.message}`);
  }
};
generateUniqueNumber()
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

/********** Aggregation Operation **********/
app.patch("/changeBizStatus/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pipeline = [{ $set: { isBusiness: { $not: "$isBusiness" } } }];
    const configuration = { new: true };
    const userFromDB = await Test.findByIdAndUpdate(
      id,
      pipeline,
      configuration
    );
    if (!userFromDB)
      throw new Error("No user with this id was foundin the database!");
    return res.send(userFromDB);
  } catch (error) {
    return handleError(res, error);
  }
});

app.patch("/changeBizStatus/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const isExist = await Test.findById(id);
    if (!isExist)
      throw new Error("No user with this id was found in the database!");

    const userFromDB = await Test.findByIdAndUpdate(
      id,
      { isBusiness: !isExist.isBusiness },
      { new: true }
    );
    return res.send(userFromDB);
  } catch (error) {
    return handleError(res, error);
  }
});

app.use((err, req, res, next) => {
  console.error(chalk.redBright(err.message));
  res.status(500).send(err.message);
});
