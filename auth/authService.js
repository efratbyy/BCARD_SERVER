const { handleError } = require("../utils/handleErrors");
const { verifyToken } = require("./Providers/jwt");
const config = require("config");

const KEY = config.get("JWT_KEY");

const auth = (req, res, next) => {
  try {
    const tokenFromClient = req.header("x-auth-token"); // מאובייקט הבקשה token-חילוץ ה
    if (!tokenFromClient) throw new Error("Authentication Error: Please Login");

    const userPayload = verifyToken(tokenFromClient, KEY); // KEY-וחילוץ הסיסמא שב tokenFromClient-חילוץ המידע שהוחבא ב
    if (!userPayload) throw new Error("Authentication Error: Unauthorize user");

    req.user = userPayload;
    return next();
  } catch (error) {
    return handleError(res, 403, error.message);
  }
};

module.exports = auth;
