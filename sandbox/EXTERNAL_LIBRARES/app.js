/******* lodash *******/

const lodash = require("lodash");
const {add} = require("lodash");

console.log("In app js");

const firstRandom = lodash.random(10, 100); // 100-מספר רנדומלי בן 10 ל

console.log(firstRandom);

console.log(add(5,65));

const secondRandomNum = lodash.random(10, 100, true);
console.log(secondRandomNum);

const thirdRandomNum = lodash.random(10, 100, false);
console.log(thirdRandomNum);

const forthRandomNum = lodash.random(10, "hallo"); // מתייחס כאילו קיבל רק פרמטר אחד ולכן יתן מספר בין אפס לעשר
console.log(forthRandomNum);

const fifthRandomNum = lodash.random(100); // יתן מספר רנדומלי בין אפס למאה
console.log(fifthRandomNum);

const sixthRandomNum = lodash.random("hello"); // יתן אפס
console.log(sixthRandomNum);
