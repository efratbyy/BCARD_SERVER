const FS = require("fs");

/******** FS Exe-01 ********/
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
//     (error) => {
//       if (error) return console.log(error.message);
//       console.log("file created");
//     }
//   );
// });

const { mkdir, writeFile, readdir, rmdir, unlink } = require("fs/promises");
const path = require("path");

/******** FS Exe-02 ********/
const users = [
  { name: "Efrat", last: "Ben Yosef" },
  { name: "Avner", last: "Yaacov" },
  { name: "Noa", last: "Levi" },
];

const API_URL = `${__dirname}/users`;

const removeFilesAndFolder = async () => {
  try {
    const userFiles = await readdir(`${__dirname}/users`);
    if (userFiles.length) {
      for (const file of userFiles) {
        if (path.extname(file) === ".txt") await unlink(`${API_URL}/${file}`);
      }
    }
    const userFolder = await readdir(API_URL);
    if (userFolder.length) return;
    await rmdir(API_URL);
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
      await writeFile(
        `${API_URL}/${user.name}-${user.last}.pdf`,
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

// const FS = require("fs");

// /******** FS Exe-01 ********/
// // const getTime = () => {
// //   const date = new Date();
// //   const year = date.getFullYear();
// //   const month = date.getMonth();
// //   const day = date.getDate();
// //   return `${day}-${month + 1}-${year}`;
// // };

// // FS.mkdir(`${__dirname}/logs`, { recursive: true }, (error, path) => {
// //   if (error) return console.log(error.message);
// //   console.log(`logs folder created!! in ${path}`);
// //   FS.writeFile(
// //     `${__dirname}/logs/${getTime()}.log`,
// //     `error message - ${new Date().toLocaleTimeString()}`,
// //     (error) => {
// //       if (error) return console.log(error.message);
// //       console.log("file created");
// //     }
// //   );
// // });

// const { mkdir, writeFile, readdir, rmdir, unlink } = require("fs/promises");
// const path = require("path");

// /******** FS Exe-02 ********/
// const users = [
//   { name: "Efrat", last: "Ben Yosef" },
//   { name: "Avner", last: "Yaacov" },
//   { name: "Noa", last: "Levi" },
// ];

// const API_URL = `${__dirname}/users`;

// const removeFilesAndFolder = async () => {
//   try {
//     const userFiles = await readdir(`${__dirname}/users`); // קורא את התקייה בנתיב שנתתי לו ומחזיר מערך עם הקבצים
//     if (userFiles.length) {
//       // במידה ויש קבצים בתקייה
//       // עושה בדיקה אם יש אורך למערך כי אם לא אני לא רוצה לנסות למחוק קובץ שלא קיים
//       for (const file of userFiles) {
//         if (path.extname(file) === ".txt")
//           // userFiles-עובר על כל קובץ וקובץ במערך שהחזיר מ
//           await unlink(`${API_URL}/${file}`); // מוחק קובץ אחר קובץ
//       }
//     }
//     // עכשיו אחרי שאני מוגן מכך שלא אנסה למחוק תיקייה שיש בתוכה קבצים
//     await rmdir(API_URL); // מחיקת התקייה כשהיא כבר ריקה מקבצים
//     console.log("Files and folder removed successfully!");
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const makeAndRemoveFilesAndFolder = async () => {
//   try {
//     const isExist = FS.existsSync(`${__dirname}/users`); // קיימת ומחזיר ערך בוליאני users בודק האם התקייה
//     if (isExist) await removeFilesAndFolder(); // שתמחק אותה removeFilesAndFolder קיימת אז מפעיל את המטודה users אם התקייה
//     await mkdir(API_URL); // users יוצר את התקייה
//     for (const user of users) {
//       // במערך שיצרנו למעלה users-עובר כל כל אחד מה
//       await writeFile(
//         `${API_URL}/${user.name}-${user.last}.txt`, // כאן נקבע את הנתיב ושם הקובץ שניצור
//         // txt ושם המשפחה שלו והסיומת של הקובץ תהייה user-שם הקובץ יהיה מורכב מהשם הפרטי של ה
//         `${user.name} ${user.last}` // user קובץ שהתוכן שיהיה בכל קובץ יהיה השם הפרטי והשם משפחה של כל
//       );
//       await writeFile(
//         `${API_URL}/${user.name}-${user.last}.pdf`,
//         `${user.name} ${user.last}`
//       );
//     }
//     console.log("made files and folder!");
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// makeAndRemoveFilesAndFolder();

// setTimeout(() => removeFilesAndFolder(), 15000);
