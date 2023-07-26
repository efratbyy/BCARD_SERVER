const bcrypt = require("bcryptjs");

const generateUserPassword = (password) => bcrypt.hashSync(password, 10);

const comparePassword = (passwordFromUser, passwordFromDB) =>
  bcrypt.compareSync(passwordFromUser, passwordFromDB);

exports.generateUserPassword = generateUserPassword;
exports.comparePassword = comparePassword;
