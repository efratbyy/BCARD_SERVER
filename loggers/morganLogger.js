const morgan = require("morgan");
const chalk = require("chalk");
const { morganTime, morganDay } = require("../utils/timeService");
const { createFile } = require("./fileService");

const morganLogger = morgan((tokens, req, res) => {
  const morganString = [
    morganTime(),
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    "-",
    tokens["response-time"](req, res),
    "MS",
  ].join(" "); // אנו הופכים אותו למחרוזת תווים join זהו מערך שבעזרת הפונקציה

  if (tokens.status(req, res) >= 400) {
    createFile(morganDay(), `${morganString}\n`); 
    // fileService.js-זוהי פונקציה שיצרנו ב createFile
    // נותן את התאריך שבו נוצר הקובץ וזה יהיה השם של הקובץ morganDay()
    // הודעת השגיאה שתופיע בקובץ morganString
    // גורם לירידת שורה \n
    return chalk.redBright(morganString); // באדום morganString במידה והסטטוס הוא גדול או שווה ל-400 נצבע את מחרוזת התווים 
  }
  return chalk.cyanBright(morganString); // במידה והסטטוס קטן מ-400 נצבע את מחרוזת התווים בטורקיז
});

module.exports = morganLogger;
