const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUser,
  getUsers,
  editUser,
  changeUserBusinessStatus,
  deleteUser,
  loginWithGoogle,
} = require("../controllers/usersController");

router.post("/", register);
router.post("/login", login);
router.post("/loginWithGoogle", loginWithGoogle);
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", editUser);
router.patch("/:id", changeUserBusinessStatus);
router.delete("/:id", deleteUser);

module.exports = router;
