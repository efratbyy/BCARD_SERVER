const jwt = require("jsonwebtoken");
const config = require("config");

const KEY = config.get("JWT_KEY"); // default.json ואת הסיסמא אגדיר בקובץ admin-זהו המפתח המוצפן שיהיה שמור ל

// token-יצירת ה
const generateAuthToken = (user) => {
  const { _id, isBusiness, isAdmin } = user; // token-פה קובעת מה יוחבא בתוך ה
  const token = jwt.sign(user, KEY); // :שמקבלת 2 פרמטרים sign וקביעת מה יהיה בתוכו בעזרת המטודה token-יצירת ה
  // payload-זה בעצם ה - token-שבו קובעת מה יהיה מוצפן בתוך ה user-הראשון זה ה
  // admin-זו בעצם הסיסמא של ה .default.json שהוא מפתח מוצפן שמוגדר למשתמשים בודדים באפליקציה. אותו אשים בקובץ KEY-השני זה ה
  return token;
};

// token-מה payload-פענוח/חילוץ ה
const verifyToken = (tokenFromClient) => {
  try {
    const userPayload = jwt.verify(tokenFromClient, KEY); // KEY-ואת ה payload-מהמשתמש ומוציא ממנו את ה token-מקבל את ה
    return userPayload;
  } catch {
    return null;
  }
};

exports.generateAuthToken = generateAuthToken;
exports.verifyToken = verifyToken;
