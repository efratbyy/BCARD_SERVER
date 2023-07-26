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
