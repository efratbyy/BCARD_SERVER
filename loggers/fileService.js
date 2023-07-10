const { mkdir, writeFile, appendFile } = require("fs/promises");
const FS = require("fs");
const chalk = require("chalk");

const createFile = async (day, morganString) => {
  try {
    const URL = `${__dirname}/logs`;
    const DAY = `${URL}/${day}.log`;

    let isExists = FS.existsSync(URL); // קיימת, אם כן הוא לא ייכנס לשורת הקוד הבאה וימשיך הלאה בקוד logs בודק האם התקייה
    if (!isExists) await mkdir(URL); // ואז ממשיך הלאה בקוד logs במידה ולא קיימת יוצר את התקייה 

    const isFileExists = FS.existsSync(DAY); // בודק האם הקובץ של אותו היום נמצא ובמידה וכן ידלג על שורת הקוד הבאה וימשיך הלאה בקוד
    if (!isFileExists) await writeFile(DAY, morganString); // במידה והקובץ לא קיים הוא יוצר אותו וממשיך הלאה בקוד 
    // אומר מה לכתוב בקובץ morganString-אומר מה יהיה שם הקובץ ו DAY
    // שאומרת מה לכתוב בקובץ morganString מקבל 2 פרמטרים: נתיב ושם הקובץ ואת הפונקציה
    else await appendFile(DAY, morganString); // במידה והקובץ כן קיים - אז הוא לא ימחק אותו אלא רק יוסיף לו את הודעת השגיאה החדשה שהתקבלה
    // לא מוחק את הקובץ הקיים אלא רק מוסיף לו את המידע החדש - appendFile
  } catch (error) {
    console.log(chalk.redBright(`Create File Error: ${error.message}`)); // במידה ויש שגיאה יכתוב לנו אותה בקונסול בצבע אדום
  }
};

exports.createFile = createFile;
