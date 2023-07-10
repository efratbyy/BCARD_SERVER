const registerValidation = require("../models/joi/registerValidation");
const { handleError } = require("../../utils/handleErrors");
const User = require("../models/mongoose/User");
const normalizeUser = require("../helpers/normalizeUser");
const loginValidation = require("../models/joi/loginValidation");
const { comparePassword, generateUserPassword } = require("../helpers/bcrypt");
const { generateAuthToken } = require("../../auth/Providers/jwt");
const { OAuth2Client } = require("google-auth-library");
const userUpdateValidation = require("../models/joi/userUpdateValidation");

const register = async (req, res) => {
  try {
    const user = req.body;
    const { email } = user;

    const { error } = registerValidation(user);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const isUserExistInDB = await User.findOne({ email });
    if (isUserExistInDB) throw new Error("User already registered");

    const normalizedUser = normalizeUser(user);
    const newUser = new User(normalizedUser);
    const userFromDB = await newUser.save();
    res.status(201).send(userFromDB);
  } catch (error) {
    return handleError(res, 500, `Joi Error: ${error.message}`);
  }
};

const login = async (req, res) => {
  try {
    const user = req.body;
    const { email } = user;

    const { error } = loginValidation(user);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const userInDB = await User.findOne({ email });

    if (!userInDB)
      throw new Error("Authentication Error: Invalid email or password");

    const isPasswordValid = comparePassword(user.password, userInDB.password);

    if (!isPasswordValid)
      throw new Error("Authentication Error: Invalid email or password");

    const { _id, isBusiness, isAdmin } = userInDB; // token-שנוצר בשורה 40 את מה שצריכה בשביל לייצר את ה userInDB-מחלצת התוך ה
    const token = generateAuthToken({ _id, isBusiness, isAdmin }); // עם השדות הדרושים לו token-מייצרת את ה
    console.log(token);
    res.send(token);
  } catch (error) {
    const isAuthError =
      error.message === "Authentication Error: Invalid email or password";
    return handleError(
      res,
      isAuthError ? 403 : 500,
      `Mongoose Error: ${error.message}`
    );
    // אז השגיאה תהייה 500 false השגיאה תהייה 403 ואם היא true הוא isAuthError אם  - isAuthError ? 403 : 500
  }
};

const verifyGoogleIdToken = async (req, res) => {
  const { idToken } = req.body;
  const clientId =
    "238799202757-utcf1kgstkd14ibbqr67dq4kbd97le4p.apps.googleusercontent.com";
  const client = new OAuth2Client(clientId);

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: clientId,
    });

    const payload = ticket.getPayload();
    const userId = payload.sub;
    const email = payload.email;
    const name = payload.name;

    return res.send({ success: true, userId, email, name });
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: 1 });
    return res.send(users);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const getUser = async (req, res) => {
  try {
    let { id } = req.params;

    const user = await User.findById(id);
    if (!user) throw new Error("Could not find this user in the database");
    return res.send(user);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const editUser = async (req, res) => {
  try {
    const user = req.body;
    const { id } = req.params;
    console.log("id:", id);
    console.log("user:", user);
    console.log(typeof user);

    if (!user || typeof user !== "object" || !user.name || !user.password) {
      throw new Error("Invalid user object");
    }

    const { error } = userUpdateValidation(user);
    if (error)
      return handleError(res, 400, `Joi error: ${error.details[0].message}`);

    const userToUpdate = await normalizeUser(user);
    userToUpdate.password = generateUserPassword(userToUpdate.password);

    const userFromDB = await User.findByIdAndUpdate(id, userToUpdate, {
      new: true,
    });

    if (!userFromDB)
      throw new Error(
        "Could not update this user because a user with this ID cannot be found in the database”"
      );

    return res.send(userFromDB);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const changeUserBusinessStatus = async (req, res) => {
  try {
    const { id } = req.params;

    isUserExistInDB = await User.findById(id);
    if (!isUserExistInDB)
      throw new Error("No user with this id was found in the database!");

    const userFromDB = await User.findByIdAndUpdate(
      id,
      { isBusiness: !isUserExistInDB.isBusiness },
      { new: true }
    );
    return res.send(userFromDB);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const deleteUser = async (req, res) => {
  try {
    let { id } = req.params;

    const user = await User.findById(id);
    // console.log(user);

    if (!user)
      throw new Error(
        "Could not delete this user because a user with this ID cannot be found in the database"
      );

    const deletedUserFromDB = await User.findByIdAndDelete(id);
    res.send(deletedUserFromDB);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

exports.register = register;
exports.login = login;
exports.verifyGoogleIdToken = verifyGoogleIdToken;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.editUser = editUser;
exports.changeUserBusinessStatus = changeUserBusinessStatus;
exports.deleteUser = deleteUser;

// const registerValidation = require("../models/joi/registerValidation");
// const { handleError } = require("../../utils/handleErrors");
// const User = require("../models/mongoose/User");
// const normalizeUser = require("../helpers/normalizeUser");
// const loginValidation = require("../models/joi/loginValidation");
// const { comparePassword, generateUserPassword } = require("../helpers/bcrypt");
// const { generateAuthToken } = require("../../auth/Providers/jwt");

// const register = async (req, res) => {
//   try {
//     const user = req.body;
//     const { email } = user;

//     const { error } = registerValidation(user);
//     if (error)
//       return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

//     const isUserExistInDB = await User.findOne({ email });
//     if (isUserExistInDB) throw new Error("User already registered");
//     // במידה והמייל קיים יזרוק שגיאה

//     const normalizedUser = normalizeUser(user);
//     const newUser = new User(normalizedUser);
//     const userFromDB = await newUser.save();
//     res.status(201).send(userFromDB);
//   } catch (error) {
//     return handleError(res, 500, `Joi Error: ${error.message}`);
//   }
// };

// const login = async (req, res) => {
//   try {
//     const user = req.body;
//     const { email } = user;

//     const { error } = loginValidation(user);
//     if (error)
//       return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

//     const userInDB = await User.findOne({ email });

//     if (!userInDB)
//       throw new Error("Authentication Error: Invalid email or password");

//     const isPasswordValid = comparePassword(user.password, userInDB.password);

//     if (!isPasswordValid)
//       throw new Error("Authentication Error: Invalid email or password");

//     const { _id, isBusiness, isAdmin } = userInDB; // token-שנוצר בשורה 40 את מה שצריכה בשביל לייצר את ה userInDB-מחלצת התוך ה
//     const token = generateAuthToken({ _id, isBusiness, isAdmin }); // עם השדות הדרושים לו token-מייצרת את ה
//     console.log(token);
//     res.send(token); // המוצפן לגולש token-מחזיר את ה
//   } catch (error) {
//     const isAuthError =
//       error.message === "Authentication Error: Invalid email or password";
//     return handleError(
//       res,
//       isAuthError ? 403 : 500,
//       `Mongoose Error: ${error.message}`
//     );
//     // אז השגיאה תהייה 500 false השגיאה תהייה 403 ואם היא true הוא isAuthError אם  - isAuthError ? 403 : 500
//   }
// };

// const getUsers = async (req, res) => {
//   try {
//     const users = await User.find().sort({ createdAt: 1 });
//     return res.send(users);
//   } catch (error) {
//     return handleError(res, 404, `Mongoose Error: ${error.message}`);
//   }
// };

// const getUser = async (req, res) => {
//   try {
//     const { userId } = req.user;
//     const user = await User.findById(userId);
//     if (!user) throw new Error("Could not find this user in the database");
//     return res.send(user);
//   } catch (error) {
//     return handleError(res, 404, `Mongoose Error: ${error.message}`);
//   }
// };

// const editUser = async (req, res) => {
//   try {
//     const user = req.user;
//     const { userId } = req.user;
//     console.log(userId);
//     console.log(user);

//     const { error } = registerValidation(user);
//     if (error)
//       return handleError(res, 400, `Joi error: ${error.details[0].message}`);

//     const userToUpdate = await normalizeUser(user);
//     userToUpdate.password = generateUserPassword(userToUpdate.password);
//     console.log("userToUpdate:", userToUpdate);
//     console.log(typeof userId);

//     const userFromDB = await User.findByIdAndUpdate(userId, userToUpdate, {
//       new: true,
//     });
//     console.log("userFromDB:", userFromDB);

//     if (!userFromDB)
//       throw new Error(
//         "Could not update this user because a user with this ID cannot be found in the database”"
//       );

//     return res.send(userFromDB);
//   } catch (error) {
//     return handleError(res, 404, `Mongoose Error: ${error.message}`);
//   }
// };

// exports.register = register;
// exports.login = login;
// exports.getUsers = getUsers;
// exports.getUser = getUser;
// exports.editUser = editUser;

// const express = require("express");
// const router = express.Router();

// router.post("/", (req, res) => {
//   console.log("in users registration");
//   req.send("in users registration");
// });

// router.post("/login", (req, res) => {
//   console.log("in users login");
//   req.send("in users login");
// });

// module.exports = router;
