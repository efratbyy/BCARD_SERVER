const OS = require("os");

const TOTAL_MEMORY = `${OS.totalmem() / 1073741824} GB`; // bytes-מקבל את גודל הזיכרון של המחשב ב
const FREE_MEMORY = `${OS.freemem() / 1073741824} GB`; // bytes-מקבל את הזיכרון הפנוי ב
const memoryInfo = { total: TOTAL_MEMORY, free: FREE_MEMORY };
const NAME_SYSTEM = `${OS.platform()}`;
const VERSION_SYSTEM = `${OS.version()}`;
const TYPE = `${OS.type()}`;
const HOST_COMPUTER = `${OS.hostname}`;
const ARCHITECTURE_SYSTEM = `${OS.arch()}`;

console.table({ TOTAL_MEMORY, FREE_MEMORY });
console.table({ memoryInfo });
console.table({
  TOTAL_MEMORY,
  FREE_MEMORY,
  NAME_SYSTEM,
  VERSION_SYSTEM,
  TYPE,
  HOST_COMPUTER,
  ARCHITECTURE_SYSTEM,
});
