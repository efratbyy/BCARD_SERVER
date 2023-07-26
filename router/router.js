const express = require("express");
const router = express.Router();
const cardsRoutes = require("../cards/routes/cardsRoutes");
const { handleError } = require("../utils/handleErrors");
const usersRoutes = require("../users/routes/usersRoutes");

router.use("/cards", cardsRoutes);
router.use("/users", usersRoutes);

router.use((req, res) => handleError(res));

module.exports = router;
