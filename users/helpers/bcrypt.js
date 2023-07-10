const bcrypt = require("bcryptjs");

const generateUserPassword = (password) => bcrypt.hashSync(password, 10);

const comparePassword = (passwordFromUser, passwordFromDB) =>
  bcrypt.compareSync(passwordFromUser, passwordFromDB);

exports.generateUserPassword = generateUserPassword;
exports.comparePassword = comparePassword;

// // ספרייה שאחראית על הצפנת מידע/סיסמאות
// const bcrypt = require("bcryptjs");

// // יצירת ההצפנה
// const generateUserPassword = (password) => bcrypt.hashSync(password, 10);
// // מקבל סיסמא לא מוצפנת ומצפין אותה
// // מקבל 2 פרמטרים: הראשון זו הסיסמא להצפנה והשני שהוא לא חובה זה איך רוצה להצפין/חוזק ההצפנה

// const comparePassword = (passwordFromUser, passwordFromDB) =>
//   bcrypt.compareSync(passwordFromUser, passwordFromDB);
// // ישווה בין הסיסמא מהמשתמש לסיסמא ממאגר המידע

// exports.generateUserPassword = generateUserPassword;
// exports.comparePassword = comparePassword;
