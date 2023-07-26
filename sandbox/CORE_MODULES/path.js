/******** join ********/
const path = require("path");

const root = path.join(__dirname, "../", "MODULE_EXPORTS/exports.keys");
console.log(root);

/******** path exe *******/
// const fs = require("fs");
// const {
//   mkdir,
//   writeFile,
//   appendFile,
//   readdir,
//   rmdir,
//   unlink,
// } = require("fs/promises");

// const path = require("path");

// const users = [
//   { name: "John", last: "Doe" },
//   { name: "David", last: "Yakin" },
//   { name: "Moshe", last: "Mizrahi" },
// ];

// const API_URL = `${__dirname}/users`;

// const removeFilesAndFolder = async () => {
//   try {
//     let userFiles = await readdir(API_URL);
//     if (userFiles.length) {
//       for (const file of userFiles) {
//         await unlink(`${API_URL}/${file}`);
//       }
//     }
//     userFiles = await readdir(API_URL);
//     if (userFiles.length) return;
//     await rmdir(API_URL);
//     console.log("Files and Folders removed successfully");
//   } catch (error) {
//     console.log(error.message);
//   }
// };
// const removeFolderOfTxt = async () => {
//   try {
//     let userFiles = await readdir(API_URL);
//     if (userFiles.length) {
//       for (const file of userFiles) {
//         if (path.extname(file) === ".txt") await unlink(`${API_URL}/${file}`);
//       }
//     }
//     userFiles = await readdir(API_URL);
//     if (userFiles.length) return;
//     await rmdir(API_URL);
//     console.log("Files and Folders removed successfully");
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const makeAndRemoveFilesAndFolders = async () => {
//   try {
//     let isExists = fs.existsSync(API_URL);
//     if (isExists) await removeFilesAndFolder();

//     await mkdir(API_URL);
//     for (const user of users) {
//       await writeFile(
//         `${API_URL}/${user.name}-${user.last}.txt`,
//         `${user.name} ${user.last}`
//       );
//     }
//     await writeFile(`${API_URL}/test.pdf`, `Testing test.pdf`);

//     console.log("made files and folder!");
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// makeAndRemoveFilesAndFolders();

// setTimeout(() => removeFolderOfTxt(), 10000);
