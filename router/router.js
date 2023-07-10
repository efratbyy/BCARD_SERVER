const express = require("express");
const router = express.Router(); // app-זה בעצם שווה ל
const cardsRoutes = require("../cards/routes/cardsRoutes");
const { handleError } = require("../utils/handleErrors");
const usersRoutes = require("../users/routes/usersRoutes");

router.use("/cards", cardsRoutes);
router.use("/users", usersRoutes);

router.use((req, res) => handleError(res));

// router.use((req, res) => {
//   // חייב להיות אחרון!!! אחרי כל המיירטים האחרים כדי שלא יחסום את הגישה אליהם
//   errorHandler(res, 400, "Page not found!");
//   console.log("Page not found!");
// });

module.exports = router;
