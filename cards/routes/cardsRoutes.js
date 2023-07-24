const express = require("express");
const {
  getCards,
  getCard,
  getMyCards,
  createCard,
  editCard,
  likeCard,
  deleteCard,
  changeBizNumber,
} = require("../controllers/cardsController");
const auth = require("../../auth/authService");
const router = express.Router();

router.get("/", getCards); // זהו קונטרולר שאחראי לתת תשובה לגולש getCards
router.get("/my-cards", auth, getMyCards);
router.get("/:cardId", getCard);
router.post("/", auth, createCard);
router.put("/:cardId", auth, editCard);
router.patch("/:cardId", auth, likeCard);
router.delete("/:cardId", auth, deleteCard);
router.put("/biz/:cardId", auth, changeBizNumber);

module.exports = router;
