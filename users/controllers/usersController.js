const registerValidation = require("../models/joi/registerValidation");
const { handleError } = require("../../utils/handleErrors");
const User = require("../models/mongoose/User");
const normalizeUser = require("../helpers/normalizeUser");
const loginValidation = require("../models/joi/loginValidation");
const { comparePassword } = require("../helpers/bcrypt");
const { generateAuthToken } = require("../../auth/Providers/jwt");
const { OAuth2Client } = require("google-auth-library");
const userUpdateValidation = require("../models/joi/userUpdateValidation");
const { userFromGoogle } = require("../../initialData/initGoogleUserData");

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
    if (userInDB.isGoogleSignup == true)
      throw new Error("Authentication Error: Use Google login");
    // throw new Error("Authentication Error: Invalid email or password");
    const isPasswordValid = comparePassword(user.password, userInDB.password);
    if (!isPasswordValid) {
      userInDB.loginFailedCounter += 1;
      if (userInDB.loginFailedCounter >= 3) {
        userInDB.isBlocked = true;
        userInDB.blockedTime = new Date();
        await User.findByIdAndUpdate(userInDB.id, userInDB);
        throw new Error("Authentication Error: User is Blocked!");
      }
      await User.findByIdAndUpdate(userInDB.id, userInDB);
      throw new Error("Authentication Error: Invalid email or password");
    } else if (!userInDB.isBlocked) {
      const { _id, isBusiness, isAdmin } = userInDB;
      const token = generateAuthToken({ _id, isBusiness, isAdmin });
      res.send(token);
    } else {
      const twentyFourHoursBefore = new Date(
        new Date().getTime() - 24 * 60 * 60 * 1000
      );
      if (userInDB.blockedTime < twentyFourHoursBefore) {
        userInDB.isBlocked = false;
        userInDB.blockedTime = new Date();
        userInDB.loginFailedCounter = 0;
        await User.findByIdAndUpdate(userInDB.id, userInDB);
        const { _id, isBusiness, isAdmin } = userInDB;
        const token = generateAuthToken({ _id, isBusiness, isAdmin });
        res.send(token);
      } else {
        throw new Error("Authentication Error: User is still Blocked!");
      }
    }
  } catch (error) {
    const isAuthError =
      error.message === "Authentication Error: Invalid email or password";
    return handleError(
      res,
      isAuthError ? 403 : 500,
      `Mongoose Error: ${error.message}`
    );
  }
};

const loginWithGoogle = async (req, res) => {
  try {
    const { token } = req.body;
    const clientId =
      "238799202757-utcf1kgstkd14ibbqr67dq4kbd97le4p.apps.googleusercontent.com";
    const client = new OAuth2Client(clientId);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId,
    });
    const getPayload = ticket.getPayload();
    const lastName = String(getPayload["family_name"]);
    const email = String(getPayload["email"]);
    const firstName = String(getPayload["given_name"]);
    let userInDB = await User.findOne({ email });
    if (!userInDB) {
      const userFromGoogle = userFromGoogle;
      userFromGoogle.name = { first: firstName, middle: "", last: lastName };
      userFromGoogle.email = email;
      const normalizedUser = normalizeUser(userFromGoogle);
      const newUser = new User(normalizedUser);
      userInDB = await newUser.save();
    }
    const { _id, isBusiness, isAdmin } = userInDB;
    const user_token = generateAuthToken({ _id, isBusiness, isAdmin });
    res.send(user_token);
  } catch (error) {
    console.log(error);
  }
};

const verifyGoogleIdToken = async (req, res) => {
  const { idToken } = req.body;
  const clientId =
    "238799202757-2g0on4abfov5mjrpk008b78kllp2vrv8.apps.googleusercontent.com";
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
    if (!user || typeof user !== "object" || !user.name || !user.password) {
      throw new Error("Invalid user object");
    }
    const { error } = userUpdateValidation(user);
    if (error)
      return handleError(res, 400, `Joi error: ${error.details[0].message}`);
    const existUser = await User.findById(id);
    let userToUpdate;
    if (existUser.password == user.password) {
      const oldPassword = user.password;
      userToUpdate = await normalizeUser(user);
      userToUpdate.password = oldPassword;
    } else {
      userToUpdate = await normalizeUser(user);
    }
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
    const currUserId = req.body.currUserId;

    userToDelete = await User.findById(id);
    currentUser = await User.findById(currUserId);

    if (!userToDelete || !currentUser)
      throw new Error(
        "Could not delete this user because a user with this ID cannot be found in the database"
      );

    if (!currentUser.isAdmin)
      throw new Error("Only an admin user can delete other users");

    const deletedUserFromDB = await User.findByIdAndDelete(id);
    res.send(deletedUserFromDB);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

exports.register = register;
exports.login = login;
exports.loginWithGoogle = loginWithGoogle;
exports.verifyGoogleIdToken = verifyGoogleIdToken;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.editUser = editUser;
exports.changeUserBusinessStatus = changeUserBusinessStatus;
exports.deleteUser = deleteUser;
