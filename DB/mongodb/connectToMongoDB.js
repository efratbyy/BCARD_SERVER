const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("config");

const ENVIRONMENT = config.get("NODE_ENV"); // production או development משתנה שיקבע האם סביבת העבודה היא
const DB_NAME = config.get("DB_NAME"); //
const DB_PASSWORD = config.get("DB_PASSWORD");

if (ENVIRONMENT === "development")
  // connect-אז תפעיל את מונגו באופן לקולי - הכתובת שמופיעה בסוגריים ב development אם סביבת העבודה היא
  // server.js-יצירת הפונקציה לחיבור השרת עם מאגר המידע. היא תופעל ב
  mongoose
    .connect(`mongodb://127.0.0.1:27017/BCard_efrat_benYosef`) // mongodb-בכתובת שנתתי לה שמגיעה לאזור שלי ב mongodb מחברת אותי למאגר המידע של connect מטודת
    .then(() =>
      // במידה ותהייה הצלחה תרשם בקונסול ההודעה בסגול
      console.log(
        chalk.magentaBright(
          "You have been Connected to MongoDB Locally Successfully!"
        )
      )
    )
    .catch(
      (
        error // במידה ויהי כישלון תרשם בקונסול ההודעה  באדום
      ) =>
        console.log(
          chalk.redBright(` Could not Connected to MongoDB Locally: ${error}`)
        )
    );

if (ENVIRONMENT === "production")
  // connect-אז תפעיל את מונגו דרך אטלס - הכתובת שמופיעה בסוגריים ב production אם סביבת העבודה היא
  // server.js-יצירת הפונקציה לחיבור השרת עם מאגר המידע. היא תופעל ב
  mongoose
    .connect(
      `mongodb+srv://${DB_NAME}:${DB_PASSWORD}@efrat.a0lfqho.mongodb.net/BCard_efrat_benYosef`
    ) // mongodb-בכתובת שנתתי לה שמגיעה לאזור שלי ב mongodb מחברת אותי למאגר המידע של connect מטודת
    .then(() =>
      // במידה ותהייה הצלחה תרשם בקונסול ההודעה בסגול
      console.log(
        chalk.magentaBright(
          "You have been Connected to MongoDB Atlas Successfully!"
        )
      )
    )
    .catch(
      (
        error // במידה ויהי כישלון תרשם בקונסול ההודעה  באדום
      ) =>
        console.log(
          chalk.redBright(` Could not Connected to MongoDB Atlas: ${error}`)
        )
    );

/***** MongoDB structure *****/
// const mongoDb = {
//   efrat_database: {
//     cards: [{}],
//     users: [{}],
//   },
//   moshe_database: {},
//   shula: {},
// };
