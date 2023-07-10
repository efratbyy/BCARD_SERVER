const express = require("express");
const app = express();
const cors = require("cors");
const chalk = require("chalk");

const authorizedAPIs = [
  "http://127.0.0.1:5500",
  "http://127.0.0.1:3000",
  "http://localhost:3000",
];

const options = (req, callback) => {
  // console.log("in cors: ", req.headers.origin);
  const isExists = authorizedAPIs.find((api) => api === req.headers.origin);
  if (!isExists)
    return callback(
      // error message
      chalk.redBright(
        `CORS Error: the API ${req.headers.origin} is an Unauthorized API`
      ),
      {
        //CORS
        origin: false,
      }
    );
  callback(null, { origin: true });
};

app.use(cors(options));

module.exports = app;

// // CORS - Origin Resource Sharing - שיתוף משאבים מקוריים
// // http שמאפשר לשרתים לבחור מאילו כתובות הם מאפשרים לדפדפן לקבל מידע/בקשות http-זהו חלק מ
// // בראש הדף cors() חשוב להשתמש במטודה
// // npm i cors - התקנה

// const express = require("express");
// const app = express();
// const cors = require("cors");
// const chalk = require("chalk");

// const authorizedAPIs = [
//   "http://127.0.0.1:5500",
//   "http://127.0.0.1:3000",
//   "http://localhost:3000",
// ]; // אלו הן הכתובות שמהן השרת מאשר לקבל בקשות

// const options = (req, callback) => {
//   // console.log("in cors: ", req.headers.origin); // זו הכתובת שממנה נשלחה הבקשה
//   const isExists = authorizedAPIs.find((api) => api === req.headers.origin);
//   // במידה ולא מצאה כלום undefined שמחזירה או תוצאה או find ומפעיל את מטודת authorizedAPIs-עובר על מערך הכתובות ב
//   // עוברת על כל אחת מהכתובות במערך ובמידה ואחת מהן שווה לכתובת שממנה נשלחה הבקשה find מטודת
//   // זוהי הכתובת שממנה נשלחה הבקשה req.headers.origin
//   // API-כל אחד מהאיברים במערך שווה ל
//   if (!isExists)
//     // במידה ולא נמצאה אף כתובת שמורשית אציג את הודעת השגיאה באדום
//     return callback(
//       // error message
//       chalk.redBright(
//         `CORS Error: the API ${req.headers.origin} is an Unauthorized API`
//       ),
//       {
//         //CORS
//         origin: false, // בנוסף לחסימה בשרת CORS-זה האובייקט שיחזור שבמידה והגלישה הייתה מדפדן אז תשלח הודעת שגיאה של ה
//       }
//     );
//   // במידה והכתובת שממנה נשלחה הבקשה כן מופיעה במערך הכתובות שלי אז
//   callback(null, { origin: true });
// };

// // const corsOptions = {
// //   origin: authorized_sources,
// //   // code: 200, // origin שיוחזר אם תשלח בקשה מאחת הכתובות שרשומות במפתח status code-מספר ה
// // };

// // app.use(cors(corsOptions), controller);
// app.use(cors(options)); // cors() הפעלת מטודת

// module.exports = app; // app ייצוא של הפונקציה
