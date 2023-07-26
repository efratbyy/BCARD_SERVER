/******* lodash *******/

const lodash = require("lodash");
const { add } = require("lodash");

console.log("In app js");

const firstRandom = lodash.random(10, 100);

console.log(firstRandom);

console.log(add(5, 65));

const secondRandomNum = lodash.random(10, 100, true);
console.log(secondRandomNum);

const thirdRandomNum = lodash.random(10, 100, false);
console.log(thirdRandomNum);

const forthRandomNum = lodash.random(10, "hallo");
console.log(forthRandomNum);

const fifthRandomNum = lodash.random(100);
console.log(fifthRandomNum);

const sixthRandomNum = lodash.random("hello");
console.log(sixthRandomNum);
