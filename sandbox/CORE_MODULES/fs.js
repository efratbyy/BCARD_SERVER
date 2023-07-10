// const FS = require("fs");

/********* מעבר בין נתיבים **********/
// cd ./  הנתיב בתיקייה בה נמצא הקובץ
// cd ../ יציאה מהתיקייה לתיקיית האב
// cd <folder name> כניסה לתיקייה

/********* יצירת תיקייה חדשה **********/
// FS.mkdir("./test", { recursive: true }, (error, path) => {
//   if (error) return console.log(error.message);
//   console.log(`FS made folder in ${path}`);
// });

// FS.mkdir("./test", { recursive: false }, (error, path) => {
//   if (error) return console.log(error.message);
//   console.log(`FS made folder in ${path}`);
// });

// מייצר את התיקייה אבל אין גישה לנתיב בגלל שאין אובייקט קונפיגורציות כארגומנט שני
// FS.mkdir("./test", (error, path) => {
//   if (error) return console.log(error.message);
//   console.log(`FS made folder in ${path}`);
// });

// FS.mkdir("./test", error => {
//   if (error) return console.log(error.message);
//   console.log("FS made the test folder");
// });

// FS.mkdir("./test", () => {});

/********* מחיקת תיקייה **********/
// FS.rmdir(`${__dirname}/test`, error => {
//   if (error) return console.log(error.message);
//   console.log("The directory was removed!!!");
// });

// FS.rmdir(`${__dirname}/test`, error => {
//   if (error) return console.log(error.message);
//   console.log("The directory in CORE_MODULES was removed!!!");
//   FS.rmdir("../test", error => {
//     if (error) return console.log(error.message);
//     console.log("The directory in SANDBOX was removed!!!");
//   });
// });

/********* יצירת קובץ חדש **********/
// FS.writeFile(
//   `${__dirname}/test.html`,
//   "David Yakin is the king!!!!!",
//   "utf8",
//   error => {
//     if (error) return console.log(error.message);
//     console.log("I made a file!!!");
//   }
// );

// FS.mkdir(`${__dirname}/test`, { recursive: true }, (error, path) => {
//   if (error) return console.log(error.message);
//   console.log(`FS made folder in ${path}`);
//   FS.writeFile(
//     `${__dirname}/test/test.html`,
//     "David Yakin is the king!!!!!",
//     "utf8",
//     error => {
//       if (error) return console.log(error.message);
//       console.log("I made a file!!!");
//     }
//   );
// });

/***** FS exe *****/
// const getTime = () => {
//   const date = new Date();
//   const year = date.getFullYear();
//   const month = date.getMonth();
//   const day = date.getDate();
//   return `${day}-${month + 1}-${year}`;
// };

// FS.mkdir(`${__dirname}/logs`, { recursive: true }, (error, path) => {
//   if (error) return console.log(error.message);
//   console.log(`logs folder created!! in ${path}`);
//   FS.writeFile(
//     `${__dirname}/logs/${getTime()}.log`,
//     `error message - ${new Date().toLocaleTimeString()}`,
//     error => {
//       if (error) return console.log(error.message);
//       console.log("file created");
//     }
//   );
// });

/********* מחיקת קובץ **********/
// FS.unlink(`${__dirname}/test/test.html`, error => {
//   if (error) return console.log(error.message);
//   console.log("Successfully removed the file!!!");
// });

// FS.readdir(`${__dirname}/test`, (error, files) => {
//   if (error) return console.log(error.message);

//   files.forEach(file => {
//     FS.unlink(`${__dirname}/test/${file}`, error => {
//       if (error) return console.log(error.message);
//     });
//   });
// });

/********* existsSync **********/
// const isExists = FS.existsSync(`${__dirname}/test`);
// console.log(isExists);

/********* async **********/

// const { mkdir, writeFile, appendFile } = require("fs/promises");

// mkdir(`${__dirname}/test`)
//   .then(() => console.log("Made a new directory successfully!"))
//   .catch(error => console.log(error.message));

// const makeFolderAndFile = async () => {
//   try {
//     const isExists = FS.existsSync(`${__dirname}/test`);
//     if (!isExists) await mkdir(`${__dirname}/test`);
//     await writeFile(`${__dirname}/test/testing.txt`, "no!!!!!\n");
//     const isFileExists = FS.existsSync(`${__dirname}/test/testing.txt`);
//     if (!isFileExists)
//       await writeFile(`${__dirname}/test/testing.txt`, "yes!!!!!\n");
//     await appendFile(`${__dirname}/test/testing.txt`, "more data!!!\n");
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// makeFolderAndFile();

/***** Fs EXE-02 *****/
const FS = require("fs");
const { mkdir, writeFile, readdir, rmdir, unlink } = require("fs/promises");

const users = [
  { name: "yononb", last: "vannuc" },
  { name: "david", last: "king" },
  { name: "tasd", last: "asdaf" },
];

const API_URL = `${__dirname}/users`;

const removeFilesAndFolder = async () => {
  try {
    const userFiles = await readdir(`${__dirname}/users`); // מערך רק במקרה ואין קבצים ומערך עם שמות הקבצים במידה ויש בנתיב
    if (userFiles.length) {
      // עושה בדיקה אם יש אורך למערך כי אם לא אני לא רוצה לנסות למחוק קובץ שלא קיים
      for (const file of userFiles) {
        await unlink(`${API_URL}/${file}`);
      }
    }
    await rmdir(API_URL); // עכשיו אני מוגן מכך שלא אנסה למחוק תיקייה שיש בתוכה קבצים
    console.log("Files and folder removed successfully!");
  } catch (error) {
    console.log(error.message);
  }
};

const makeAndRemoveFilesAndFolder = async () => {
  try {
    const isExist = FS.existsSync(`${__dirname}/users`);
    if (isExist) await removeFilesAndFolder();

    await mkdir(API_URL);

    for (const user of users) {
      await writeFile(
        `${API_URL}/${user.name}-${user.last}.txt`,
        `${user.name} ${user.last}`
      );
    }
    console.log("made files and folder!");
  } catch (error) {
    console.log(error.message);
  }
};

makeAndRemoveFilesAndFolder();

setTimeout(() => removeFilesAndFolder(), 15000);




/******************* *******************/
// const FS = require("fs");

/********** יצירת תיקייה **********/
/** ============================ **/

/*********** יצירת תיקייה חדשה ***********/
// FS.mkdir("./test", { recursive: true }, (error, path) => {
//   if (error) return console.log(error.message);
//   console.log(`FS created a folder in ${path}`);
// });
// // פרמטר ראשון הוא הנתיב והשם של התקייה
// // אחרת לא צריך לרשום בפרמטר השני כלום recursive: true-כדי שיתן לי את הנתיב צריך להשתמש ב

/*********** יצירת תיקייה חדשה בנתיב שונה ***********/
// FS.mkdir("../MODULE_EXPORTS/test", { recursive: true }, (error, path) => {
//   if (error) return console.log(error.message);
//   console.log(`FS created a folder in ${path}`);
// });

/*********** יצירת תקייה ללא אובייקט קונפיגורציות ***********/
// FS.mkdir("./test", (error, path) => {
//   if (error) return console.log(error.message);
//   console.log(`FS created a folder in ${path}`);
// }); // path-ייצור את התקייה אך לא ידע מה ה

/********* יצירת תיקייה עם פרמטר אחד בלבד *********/
// FS.mkdir("./test", (error) => {
//   if (error) return console.log(error.message);
//   console.log("FS created the test folder!");
// });

/**** גם כך ייצור תיקייה ****/
// FS.mkdir("./test", () => {
//   console.log("FS created the test folder!");
// });

/**** גם כך ייצור תיקייה ****/
// FS.mkdir("./test", () => {});

// cd ./
// cd ../
// cd <folder name>

// _dirname - ייתן לי את התקייה שבה אני נמצאת

/********** מחיקת תיקייה **********/
/** ============================ **/

// FS.rmdir(`${_dirname}/test`, error => {
//   if (error) return console.log(error.message);
//   console. log("The directory was removed!!!");
//   });

/********* מחיקת 2 תיקיות בו זמנית שנמצאות בכתובות שונות *********/
// FS.rmdir(`${__dirname}/test`, (error) => {
//   if (error) return console.log(error.message);
//   console.log("The directory in CORE _MODULES was            removed!!!");
//   FS.rmdir(" ../test", (error) => {
//     if (error) return console.log(error.message);
//     console.log("The directory in SANDBOX was removed!!!");
//   });
// });

/********** יצירת קובץ חדש **********/
/** ============================== **/

/****** ב-2 פונקציות נפרדות ******/
// צורת רישום זו עלולה לגרום לבאגים כי עלול לנסות ליצור קודם את הקובץ לפני שנוצרה התקייה
// FS.mkdir("./test", { recursive: true }, (error, path) => {
//   // יצרית תקייה חדש
//   if (error) return console.log(error.message);
//   console.log(`FS made folder in ${path}`);
// });

// FS.writeFile(
//   `${__dirname}/test/text.txt`, // קביעת הנתיב לייצירת התקייה ושם התיקייה
//   "Efrat is the Queen!", // מה שיהיה כתוב בקובץ שניצור
//   "utf8", // html מתאים את הקובץ לכל השפות - נוסיף רק בקובץ
//   (error) => {
//     // error יכול לקבל רק אפס או אחד בפרמטר ורק את
//     if (error) return console.log(error.message);
//     console.log("I made a file!!!");
//   }
// );

/****** שילוב 2 הפונקציות שלמעלה אחת בתוך השנייה ******/
// FS.mkdir(`${__dirname}/test`, { recursive: true }, (error, path) => {
//   // יצרית תקייה חדש
//   if (error) return console.log(error.message);
//   console.log(`FS made folder in ${path}`);
//   FS.writeFile(
//     `${__dirname}/test/text.txt`, // קביעת הנתיב לייצירת התקייה ושם התיקייה
//     "Efrat is the Queen!", // מה שיהיה כתוב בקובץ שניצור
//     "utf8", // html מתאים את הקובץ לכל השפות - נוסיף רק בקובץ
//     (error) => {
//       // error יכול לקבל רק אפס או אחד בפרמטר ורק את
//       if (error) return console.log(error.message);
//       console.log("I made a file!!!");
//     }
//   );
// });

/********** מחיקת קובץ ***********/
/** ============================== **/

/********* מחיקת קובץ בודד *********/
// FS.unlink(`${__dirname}/test/test.html`, (error) => {
//   if (error) return console.log(error.message);
//   console.log("Successfully remove the file!");
// });

/******** מחיקת תקייה שלמה עם כל הקבצים שבתוכה ********/
// :לא ניתן למחוק תקייה שיש בה קבצים ולכן נעשה את הדרך הבאה
// FS.readdir(`${__dirname}/test`, (error, files) => {
//   // קורא מה שיש לי בתוך הנתיב ומחזיר לי מערך עם שמות הקבצים שבו readdir
//   // מסוג של מערך מסוגים שונים files ויכול לקבל error יכול לקבל callback-ה
//   if (error) return console.log(error.message);
//   console.log(files); // והוא יציג אותם כמערך test אלו אותם קבצים שנמצאים בתקייה files
//   files.forEach((file) => {
//     // יעבור על כל אחד מהקבצים במערך וימחק אותם
//     FS.unlink(`${__dirname}/test/${file}`, (error) => {
//       if (error) return console.log(error.message);
//     });
//   });
//   FS.rmdir(`${__dirname}/test`, (error) => { // לאחר שסיים למחוק את כל הקבצים נמחק גם את התקייה
//     if (error) return console.log(error.message);
//     console.log("You have successfully remove the files and folder!!!");
//   });
// });

/******** בדיקה האם התקייה קיימת ומחזירה ערך בוליאני - existsSync *********/
/** =================================================================== **/

// const isExists = FS.existsSync(`${__dirname}/test`);
// console.log(isExists);

/******** async מחיקת קבצים בצורה ********/
/** =================================== **/

// const { mkdir, writeFile, appendFile } = require("fs/promises");
// // יצירת תיקייה בצורה אסינכרונית
// mkdir(`${__dirname}/test`)
//   .then(() => console.log("Made new directories successfully!"))
//   .catch((error) => console.log(error.message));

// // בודק האם התקייה קיימת ואם לא יוצר אותה ויוצר בתוכה קובץ חדש
// const makeFolderAndFile = async () => {
//   try {
//     const isExists = FS.existsSync(`${__dirname}/test`); // קיימת test בודק האם התקייה
//     if (!isExists) await mkdir(`${__dirname}/test`); // במידה ולא קיימת יוצר אותה
//     await writeFile(`${__dirname}/test/testing.txt`, "no!!!\n"); // "no!!!" עם התוכן test בתוך testing.txt יוצר את הקובץ
//     const isFileExists = FS.existsSync(`${__dirname}/test/testing.txt`); // קיימת test בודק האם התקייה
//     if (!isFileExists)
//       await writeFile(`${__dirname}/test/testing.txt`, "yes!!!\n"); // הוא לא ימחק את התוכן הקודם אלא יוסיף עליו isFileExists ובגלל שהוספנו את ההתניה של "yes!!!" עם התוכן test בתוך testing.txt יוצר את הקובץ
//     await appendFile(`${__dirname}/test/testing.txt`, "more data!!!\n"); // "more data!!!" בודק האם הקובץ קיים ואם כן מוסיף את התוכן appendFile
//     // await appendFile(`${__dirname}/test/testing.txt`, "some more data!!!\n");
//   } catch (error) {
//     console.log(error.message);
//   }
// };
// makeFolderAndFile();
