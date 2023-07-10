// Mongoose היא ספריית Object Data Modeling (ODM) עבור Node.js המספקת פתרון פשוט ומבוסס סכימה לאינטראקציה עם מסדי נתונים של MongoDB. זה מאפשר למפתחים להגדיר את המבנה, כללי האימות והיחסים של הנתונים, מה שמקל על העבודה עם MongoDB בצורה מאורגנת ויעילה יותר.

const express = require("express");
const app = express();
const chalk = require("chalk");
const mongoose = require("mongoose");
const lodash = require("lodash");

app.use(express.json()); // req.body צריך להוסיף שורה זו כאשר מצפים לקבל אובייקט מסוג ג׳ייסון כמו

const PORT = 8989;
app.listen(PORT, () => {
  // מאזין לפורט של השרת
  console.log(chalk.blueBright(`Listening on: http://localhost:${PORT}`));
  mongoose
    .connect("mongodb://127.0.0.1:27017/mongoose-sandbox") // mongodb יצירת החיבור למאגר המידע. זוהי הכתובת של
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
//   id: mongoose.Types.ObjectId, // ייחודי לכל אחד מהאובייקטים id מייצר
//   array: [String], // מערך של מחרוזות תווים
// });

/******* Schema in Schema *******/
// נשלו id יוצרת לו mongoose לכל אובייקט שעובר סכמה
// לכל מפתח שהוא אובייקט ניצור סכמה  משלו
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
//     trim: true, // מעלים רווחים
//     lowercase: true, // מעביר לאותיות קטנות
//     minLength: 2, // מינימום תווים
//     maxLength: 256, // מקסימום תווים
//     default: "did not enter title", // יהיה רשום מה שכתוב פה title במידה ולא יכניסו
//     required: true, // ערך חובה
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
// צריך לקבל 3 דברים: שם המסמך - אובייקט במערך, הסכמה שנרצה להעביר את המסמך, שם הקולקשין - לא חובה כי יודע לבד לקחת את שם המסמך ולהפוך אותו לרבים וכך יקרא לקולקשיין model
// new Test(dataFromReqBody) נרשום Test זוהי מחלקה ולכן כדי ליצור אובייקט חדש מהמחלקה של Test-מה שחוזר מ

app.post("/", async (req, res) => {
  try {
    const dataFromReqBody = req.body;
    const user = new Test(dataFromReqBody); // Test יצירת אובייקט חדש מהמחלקה של
    // ואם הכל תקין מכניס אותו למערך schema-מעביר אותו בדיקה דרך ה ,req.body-שמגיע ב user לוקח את האובייקט של
    await user.save(); // במאגר מידע user במידה ועובר את הסכמה הוא ישמור את
    return res.send(user);
  } catch (error) {
    console.log(chalk.redBright(`Mongoose Schema Error: ${error.message}`));
    res.status(400).send(error.message);
  }
});

/******* find query ********/ // מטודה שאפעיל כשרוצה לקבל דברים מהמערך
app.get("/", async (req, res) => {
  try {
    const instance = await Test.find();
    // Test יביא ממאגר המידע את כל המופעים מתוך הקולקשיין/המערך
    res.send(instance); // מה שאשלח למשתמש
  } catch (error) {
    handleError(res, error);
  }
});

// https://mongoosejs.com/docs/queries.html#queries
app.get("/query", async (req, res) => {
  try {
    const instance = await Test.find({ number: { $gte: 2, $lt: 4 } });
    // המספר גדול או שווה ל-2 וקטן מ-4 number שבמפתח Test יביא ממאגר המידע את כל המופעים/אובייקטים מתוך הקולקשיין
    // const instance = await Test.find({ number: { $gte: 2, $lt: 4 }, bool: false });
    // Test יביא ממאגר המידע את כל המופעים מתוך הקולקשיין
    // :סוגים שונים של אופרטורים
    // $eq - equal
    // $ns - not equal
    // $gt - greater then
    // $gte - greater then or equal
    // $lt - lower then
    // $lte - lower then or equal
    res.send(instance); // מה שאשלח למשתמש
  } catch (error) {
    handleError(res, error);
  }
});

/******* filter ********/
app.get("/filter", async (req, res) => {
  try {
    const instance = await Test.find(
      { number: { $gte: 2, $lt: 4 } },
      { srting: 1, _id: 0 }
    );
    // שלהם גדול או שווה ל-2 וקטן מ-4 number-בחלק הראשון קובע איזה אובייקטים יגיעו ממאגר המידע - מבקש את כל האובייקטים/מופעים ששדה ה
    // הוא חיובי id ולכן כתוב 0 שזה אומר שלילי - הדיפולט של id ולכן כתוב 1 שזה אומר חיובי ולא יציג את השדה srting בחלק השני קובע אלו מפתחות מתוך האובייקט יוצגו - רק  השדה
    res.send(instance); // מה שאשלח למשתמש
  } catch (error) {
    handleError(res, error);
  }
});

/******* query - find one - params - מחזיר אובייקט ********/
// http://localhost:8989/find-one/649a8e3f45d8edaf332a2218 - בפוסטמן
app.get("/find-one/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const isExist = await Test.findOne({ _id: id });
    // שלו שווה למה שכתוב בשורת הכתובת id-ימצא לי את האובייקט שה
    // const instance = await Test.findOne({ _id: id }, { string: 1, _id: 0 });
    // string שלו יופיע בשורת הכתובת ויציג לי רק את השדה id-ימצא לי את האובייקט שה
    // const instance = await Test.findOne({ number: { $gte: 2 } });
    // שלו גדול או שווה ל-2 numder-ימצא לי את האובייקט ששדה ה
    if (!isExist) throw new Error("No item was found with this ID number");
    res.send(isExist);
  } catch (error) {
    handleError(res, error);
  }
});

/******* exe 1-a *******/
// id שלהם יש מספר שנמוך או שווה ל-18 ויציג רק את המפתח age-יציג רק את האובייקטים שבמפתח ה
app.get("/users", async (req, res) => {
  try {
    const instance = await Test.find({ age: { $lte: 18 } }, { _id: 1 });
    res.send(instance);
  } catch (error) {
    handleError(res, error);
  }
});

/******* exe 1-b - query params *******/
// first יציג את האובייקט הראשון שימצא ששם המשפחה שלו מופיע בשורת הכתובת ויציג רק את השדה
// בפוסטמן - http://localhost:8989/find-user/last?last=levi
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

/************* find מטודות לניתן לשרשר למטודה *************/

/********* count *********/
// מטודה שמציגה לי מספר עם כמות האובייקטים/האיברים במערך
app.get("/count", async (req, res) => {
  try {
    const instance = await Test.find({}).count();
    res.send({ "Numbers Of Items": instance });
  } catch (error) {
    handleError(res, error);
  }
});

/********* select *********/
// מטודה שמאפשרת לי לבחור אלו שדות רוצה שיוצגו. במידה ולא רוצה שיוצג שדה מסויים אשים לפניו את הסימן מינוס
app.get("/select", async (req, res) => {
  try {
    const instance = await Test.find({}).select(["first", "last", "-_id"]);
    res.send(instance);
  } catch (error) {
    handleError(res, error);
  }
});

/********* sort *********/
// מטודה שמציגה לי את האובייקטים לפי סדר עולה/יורד של השדה שבחרתי. 1- מהגבוה לנמוך, 1 מהנמוך לגבוה
app.get("/sort", async (req, res) => {
  try {
    const instance = await Test.find({}).sort({ age: -1 });
    res.send(instance);
  } catch (error) {
    handleError(res, error);
  }
});

/********* sort and sort *********/
// איחוד של 2 המטודות: מאפשר לי לבחור אילו שדות יוצגו ולפי איזה שדה להציג ובאיזה סדר למיין אותם
app.get("/select-sort", async (req, res) => {
  try {
    const instance = await Test.find({}) // מביא את כל האובייקטים
      .select(["first", "-_id"]) // first - יציג רק את השדות שבחרתי
      .sort({ age: -1 }); // ימיין אותם בסדר שאבחר - יורד
    res.send(instance);
  } catch (error) {
    handleError(res, error);
  }
});

/******** findById *********/
// שבשורת הכתובת id-שלו תואם ל id-מטודה שתחזיר לי את האובייקט שה
// בפוסטמן - http://localhost:8989/findById/649ad6a69b70a87ec6f00af
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
// :בפוסטמן אשלח
// http://localhost:8989/findByIdAndUpdate/649aa68ecf7b06b40134821b
// {"age": 23}
// user -תואמים לאותו ה body-שבשורת הכתובת והמפתח והערך שהכנסתי ב id-שלו תואם ל id-מטודה שתחזיר לי את האובייקט שה
app.put("/findByIdAndUpdate/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.body;
    const userFromDB = await Test.findByIdAndUpdate(id, user, { new: true });
    // שלו מופיע בשורת הכתובת id-שה user-זה הערך שהכנסתי בגוף הבקשה ושצריך להיות תואם לאותו ה - user
    // יחזיר לי את הכרטיס אחרי השינוי. אם לא אוסיף זאת אקבל את הכרטיס שלפני השינוי ורק אחרי שאשלח שוב את הבקשה בפוסטמן אקבל את הכרטיס שאחרי השינוי {new: true}
    if (!userFromDB) throw new Error("No user found with this ID number");
    res.send(userFromDB);
  } catch (error) {
    handleError(res, error);
  }
});

/******** findById and delete *********/
// שמופיע בשורת הכתובת ומוחקת אותו id-מטודה שמוצאת את האובייקט לפי ה
app.delete("/findByIdAndDelete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUserFromDB = await Test.findByIdAndDelete(id);
    if (!deletedUserFromDB)
      throw new Error("No item was found with this ID number");
    res.send(deletedUserFromDB); // שולח את האובייקט שנמחק
  } catch (error) {
    handleError(res, error);
  }
});

// const deleteItemSchema = new mongoose.Schema({
//   first: String,
//   last: String,
//   age: Number,
//   isBusiness: Boolean,
//   date: Date, // התאריך שבו נוצר לראשונה
// });

// const Deleted = mongoose.model("deleted", deleteItemSchema);

// app.delete("/findByIdAndDelete/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedUserFromDB = await Test.findByIdAndDelete(id);
//     if (!deletedUserFromDB) throw new Error("Did not found user with this id");

//     const normalizedUserForArchive = lodash.pick( // מטודה שמקבל אובייקט ואלו מפתחות רוצה לחלץ ממנו pick
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
    const instance = await Test.find({}) // מציג את כל האובייקטים
      .select(["last", "-_id"]) // יציג רק את השדות שבחרתח
      .sort({ last: 1 }); // ימיין אותם בסדר יורד
    res.send(instance);
  } catch (error) {
    handleError(res, error);
  }
});

/******** unique number ********/
const generateUniqeNumber = async () => {
  try {
    const random = lodash.random(1, 3); // יתן לי מספר רנדומלי בין 1 ל-3
    console.log("random", random); // יציג את המספר הרנדומלי שהוגרל
    const isExist = await Test.findOne({ age: random }, { age: 1, _id: 0 });
    // age יהיה המספר הרנדומלי שיוגרל ויציג רק את השדה age-יציג את האובייקט הראשון שימצא ששדה ה
    console.log("isExist", isExist);
    // null תואם למספר הרנדומלי שהוגרל. במידה ולא נמצא אובייקט כזה יחזיר age-יציג את האובייקט ששדה ה
    if (isExist) return generateUniqeNumber();
    // שוב generateUniqeNumber שלו שווה למספר הרנדומלי שהוגרל תופעל הפונקציה age-במידה ונמצא אובייקט ששדה ה
    return Promise.resolve(random); // הפונקציה תחזיר את המספר הרנדומלי שהוגרל
  } catch (error) {
    return Promise.reject(`Mongoose Error: ${error.message}`);
  }
};

generateUniqeNumber() // catch-ו then-ולכן משתמשת ב promis זוהי פונקציה אסינכרונית שמחזירה
  .then((data) => console.log(data)) // במידה ותהייה הצלחה תציג לי את האובייקט שנמצא בקונסול
  .catch((error) => console.log(error)); // במידה ויהיה כישלון תציג לי את השגיאה בקונסול

/********** Aggregation Operation **********/
// false-ל true-מ isBusiness מטודה שמשנה את
app.patch("/changeBizStatus/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pipeline = [{ $set: { isBusiness: { $not: "$isBusiness" } } }];
    // וההפך false-נשנה ל true נשנה לערך הנגדי שלו - אם היה isBusiness בשורה זו אנו מגדירים שאת המפתח
    // אופרטור שמשנה את המפתח הנבחר למה שנגדיר לו - $set
    const configuration = { new: true }; // קובע שהאובייקט שיוחזר יופיע ישר עם השינוי שבוצע
    const userFronDB = await Test.findByIdAndUpdate(
      //
      id, // יגיע מהפרמס - שורת הכתובת
      pipeline, // המפתח שרוצה לשנות ולמה רוצה לשנות
      configuration // מבקשת שהאובייקט שיוחזר יופיע ישר עם השינוי שבוצע
    );
    if (!userFronDB)
      // שתואם למה שמופיע בשורת הכתובות תוצג השגיאה הבאה id במידה ולא נמצא אובייקט עם
      throw new Error("No user with this id was foundin the database!");
    return res.send(userFronDB); // שבשורת הכתובות הוא יוחזר לגולש id-במידה ונמצא אובייקט שתואם את ה
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
  // post של catch-היא תיתפס כאן. רוב הסיכויים שתעצר כבר ב post-מנגנון ליתר ביטחון - במידה והשגיאה לא נתפסה ב
  console.error(chalk.redBright(err.message));
  res.status(500).send(err.message);
});
