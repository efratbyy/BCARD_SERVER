const express = require("express");
const app = express();
const chalk = require("chalk");
const router = require("./router/router");
const cors = require("./cors/cors");
const morganLogger = require("./loggers/morganLogger");
const config = require("config");
const {
  generateInitialCards,
  generateInitialUsers,
} = require("./initialData/initialDataService");

app.use(morganLogger);
app.use(cors);
app.use(express.json());
app.use(router);
app.use(express.static("./public"));
app.use(express.text());

const PORT = config.get("PORT") || 9000;
app.listen(PORT, () => {
  console.log(chalk.blueBright(`Listening on: http://localhost: ${PORT}`));
  require("./DB/mongodb/connectToMongoDB");
  generateInitialCards();
  generateInitialUsers();
});

// const express = require("express");
// const app = express();
// const chalk = require("chalk");
// const router = require("./router/router");
// const cors = require("./cors/cors");
// const morganLogger = require("./loggers/morganLogger");
// const config = require("config");
// const {
//   generateInitialCards,
//   generateInitialUsers,
// } = require("./initialData/initialDataService");

// app.use(morganLogger);
// // app.use(cors); // cors.js-שייבאנו מ cors הפעלה של
// app.use(express.json()); // cors-וגם לפני ה morganLogger-אין משמעות אם יהיה גם לפני ה .router-המיקום שלו חשוב!! חייב להיות לפני ה
// // req.body-כדי אוכל לקבל אובייקטים של ג׳ייסון ב
// app.use(router); // על כל סוגי הבקשות router הפעלת
// app.use(express.static("./public"));
// app.use(express.text());

// const PORT = config.get("PORT") || 9000;
// // 8180 שמוגדר שם development.json-מגיע מ PORT-ה
// app.listen(PORT, () => {
//   console.log(chalk.blueBright(`Listening on: http://localhost: ${PORT}`));
//   require("./DB/mongodb/connectToMongoDB"); // שיבצע את החיבור למאגר המידע connectToMongoDB אחרי שמאזין לשרת שולחת אותו לקובץ
//   generateInitialCards();
//   generateInitialUsers();
//   // ימוקם בסוף כי אם אין קשר עם השרת לא ניתן להכניס כלום למאגר המידע ולכן קודם השרת יתחבר ורק אז נבצע את החיבור למאגר המידע
// });

// // והפענוח שלו תקינים token-בדיקה שיצירת ה
// const { generateAuthToken, verifyToken } = require("./auth/Providers/jwt");

// const token = generateAuthToken({
//   _id: "123456",
//   isBusiness: false,
//   isAdmin: true,
// });
// const isVerify = verifyToken(token);
// // const isVerify = verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjM0NTYiLCJpc0J1c2luZXNzIjp0cnVlLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODgyMTc2NTF9.0K_BBk5_4czCjoox5gatVtUNaNV-wZsVvnd2DUY1W8I"); // null אך הוא זיהה זאת והחזרי לי https://jwt.io/ בעזרת true-ל isBusiness בטוקן הזה שיניתי את
// console.log(token);
// // שבשורה 26 token-ולהכניס את הטוקן שקיבלנו בקונסול ולראות שאכן מוחבאים בו המפתחות והערכים שקבענו ב https://jwt.io/ בשביל לבדוק שהכל תקין ניתן ללכת לאתר
// console.log(isVerify); // מחזיר אובייקט עם כל המפתחות והערכים שהחבאתי בתוכו
// // { _id: '123456', isBusiness: false, isAdmin: true, iat: 1688217952 }
