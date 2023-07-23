const validateCard = require("../models/joi/validateCard");
const { handleError } = require("../../utils/handleErrors");
const Card = require("../models/mongoose/Card");
const normalizeCard = require("../helpers/normalizeCard");

const getCards = async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: 1 });
    return res.send(cards);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const getCard = async (req, res) => {
  try {
    let { cardId } = req.params;
    cardId = cardId.trim();
    const card = await Card.findById(cardId);
    if (!card) throw new Error("Could not find this card in the database");
    return res.send(card);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const getMyCards = async (req, res) => {
  try {
    const user = req.user;
    const cards = await Card.find({ user_id: user._id });
    if (!cards) throw new Error("Could not find any card in the database");
    return res.send(cards);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const createCard = async (req, res) => {
  try {
    const card = req.body;
    const user = req.user;

    if (!user.isBusiness)
      throw new Error(
        "You must be a business type user in order to create cards"
      );

    const { error } = validateCard(card);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    const normalizedCard = await normalizeCard(card, user._id);
    const cardToDB = new Card(normalizedCard);
    const cardFromDB = await cardToDB.save();
    res.send(cardFromDB);
  } catch (error) {
    return handleError(res, 500, `Mongoose Error: ${error.message}`);
  }
};

const editCard = async (req, res) => {
  try {
    const card = req.body;
    let { cardId } = req.params;
    const user = req.user;
    cardId = cardId.trim();

    if (user._id != card.user_id)
      throw new Error(
        "Authorization Error: Only the user who created the business card can edit this card"
      );

    const { error } = validateCard(card);
    if (error)
      return handleError(res, 400, `Joi error: ${error.details[0].message}`);

    const cardToUpdate = await normalizeCard(card, user._id);

    const { bizNumber } = cardToUpdate;
    const isBizNumberExist = await Card.findOne({ bizNumber });
    if (!isBizNumberExist && !user.isAdmin)
      throw new Error("Only admin can edit the bizNumber!");
    if (isBizNumberExist && isBizNumberExist._id != cardId)
      throw new Error(
        "User with this bizNumber is already exist in the database!"
      );

    const cardFromDB = await Card.findByIdAndUpdate(cardId, cardToUpdate, {
      new: true,
    });

    if (!cardFromDB)
      throw new Error(
        "Could not update this card because a card with this ID cannot be found in the database”"
      );

    return res.send(cardFromDB);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const likeCard = async (req, res) => {
  try {
    let { cardId } = req.params;
    cardId = cardId.trim();
    const user = req.user;

    let card = await Card.findById(cardId);
    if (!card)
      throw new Error(
        "Could not change card likes because a card with this ID cannot be found in the database"
      );

    if (!user)
      throw new Error(
        "Authorization Error: Only a registered user can mark as liked the business cards"
      );

    const cardLikes = card.likes.find((id) => id === user._id);
    if (!cardLikes) {
      card.likes.push(user._id);
      card = await card.save();
      return res.send(card);
    }
    const cardFiltered = card.likes.filter((id) => id !== user._id);
    card.likes = cardFiltered;
    card = await card.save();
    return res.send(card);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const deleteCard = async (req, res) => {
  try {
    const user = req.user;
    let { cardId } = req.params;
    cardId = cardId.trim();

    const card = await Card.findById(cardId);
    if (!card)
      throw new Error(
        "Could not delete this card because a card with this ID cannot be found in the database"
      );

    if (!user.isAdmin && user._id != card.user_id)
      throw new Error(
        "Authorization Error: Only the user who created the business card or admin can delete this card"
      );

    const deletedCardFromDB = await Card.findByIdAndDelete(cardId);
    res.send(deletedCardFromDB);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

const changeBizNumber = async (req, res) => {
  try {
    const card = req.body;
    const user = req.user;
    const { cardId } = req.params;

    // if (!user.isAdmin);
    // throw new Error(
    //   "You must be an admin type user in order to change the bizNumber"
    // );

    const { error } = validateCard(card);
    if (error)
      return handleError(res, 400, `Joi error: ${error.details[0].message}`);

    const cardToChangeBizNumber = await normalizeCard(card, user._id);
    const { bizNumber } = cardToChangeBizNumber;
    const isBizNumberExist = await Card.findOne({ bizNumber });

    if (isBizNumberExist && isBizNumberExist._id != cardId)
      throw new Error(
        "User with this bizNumber is alredy exist in the database!"
      );

    cardFromDB = await Card.findByIdAndUpdate(
      cardId,
      { $set: { bizNumber: bizNumber } },
      { new: true }
    );
    return res.send(cardFromDB);
  } catch (error) {
    return handleError(res, 404, `Mongoose Error: ${error.message}`);
  }
};

exports.getCards = getCards;
exports.getCard = getCard;
exports.getMyCards = getMyCards;
exports.createCard = createCard;
exports.editCard = editCard;
exports.likeCard = likeCard;
exports.deleteCard = deleteCard;
exports.changeBizNumber = changeBizNumber;

// const validateCard = require("../models/joi/validateCard");
// const { handleError } = require("../../utils/handleErrors");
// const Card = require("../models/mongoose/Card");
// const normalizeCard = require("../helpers/normalizeCard");

// const getCards = async (req, res) => {
//   try {
//     const cards = await Card.find().sort({ createdAt: 1 });
//     return res.send(cards);
//   } catch (error) {
//     return handleError(res, 404, `Mongoose Error: ${error.message}`);
//   }
// };

// const getCard = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const card = await Card.findById(id);
//     if (!card) throw new Error("Could not find this card in the database");
//     return res.send(card);
//   } catch (error) {
//     return handleError(res, 404, `Mongoose Error: ${error.message}`);
//   }
// };

// const getMyCards = async (req, res) => {
//   try {
//     const user = req.user;
//     const cards = await Card.find({ user_id: user._id });
//     if (!cards) throw new Error("Could not find any card in the database");
//     return res.send(cards);
//   } catch (error) {
//     return handleError(res, 404, `Mongoose Error: ${error.message}`);
//   }
// };

// const createCard = async (req, res) => {
//   try {
//     const card = req.body;
//     const user = req.user;

//     if (!user.isBusiness)
//       throw new Error(
//         "You must be a business type user in order to create cards"
//       );
//     const { error } = validateCard(card);
//     if (error)
//       return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

//     const normalizedCard = normalizeCard(card, user._id);
//     const cardToDB = new Card(normalizedCard);
//     const cardFromDB = await cardToDB.save();
//     res.send(cardFromDB);
//   } catch (error) {
//     return handleError(res, 500, `Mongoose Error: ${error.message}`);
//   }
// };

// const editCard = async (req, res) => {
//   try {
//     const card = req.body;
//     const { id } = req.params;
//     const user = req.user;

//     // if (user._id != card.user_id)
//     //   throw new Error(
//     //     "Authorization Error: Only the user who created the business card can edit this card"
//     //   );

//     const { error } = validateCard(card);
//     if (error)
//       return handleError(res, 400, `Joi error: ${error.details[0].message}`);

// cardId = cardId.trim(); // cardId מורידה רווחים ממחרוזת התווים של
// if (!mongoose.Types.ObjectId.isValid(cardId)) {
//   // MongoDB הוא אובייקט חוקי של cardId בודקת האם
//   throw new Error("Invalid cardId");
// }

//     const cardToUpdate = await normalizeCard(card, user._id);
//     console.log("cardToUpdate:", cardToUpdate);
//     const cardFromDB = await Card.findByIdAndUpdate(id, cardToUpdate, {
//       new: true,
//     });
//     console.log("cardFromDB:", cardFromDB);

//     if (!cardFromDB)
//       throw new Error(
//         "Could not update this card because a card with this ID cannot be found in the database”"
//       );

//     return res.send(cardFromDB);
//   } catch (error) {
//     return handleError(res, 404, `Mongoose Error: ${error.message}`);
//   }
// };

// const likeCard = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = req.user;

//     const card = await Card.findById(id);
//     if (!card)
//       throw new Error(
//         "Could not change card likes because a card with this ID cannot be found in the database"
//       );

//     if (!user)
//       throw new Error(
//         "Authorization Error: Only a registered user can mark as liked the business cards"
//       );

//     const cardLikes = card.likes.find((id) => id === user._id); // מחזיר את האיבר הראשון במערך שעומד בתנאי שבסוגריים find
//     // שבכרטיס likes שלו למערך של id-המחובר אז תוסיף את ה user-של ה id-לא תואמים ל id(user.id)-אם אף אחד מה
//     if (!cardLikes) {
//       // :שבכרטיס אז likes לא קיים במערך של user-של ה id-במידה וה
//       card.likes.push(user._id); // likes יוסיף אותו למערך של
//       card = await card.save(); // likes וישמור את הכרטיס לאחר השינוי במערך של
//       return res.send(card);
//     }
//     // :שבכרטיס אז likes כן קיים במערך של user-של ה id-במידה וה
//     const cardFiltered = card.likes.filter((id) => id !== user._id);
//     // יחזיר את כל האיברים במערך שעומדים בתנאי שבסוגריים filter
//     // של המשתמש שמחובר (user._id)id-ששווים ל id-שווה למערך שהאיברים שבו הם כל ה cardFiltered
//     card.likes = cardFiltered; // cardFiltered-עם הערך שחזר מ likes מעדכן את המערך
//     card = await card.save(); // likes שומר את הכרטיס לאחר העדכון של המערך
//     return res.send(card);
//   } catch (error) {
//     return handleError(res, 404, `Mongoose Error: ${error.message}`);
//   }
// };

// const deleteCard = async (req, res) => {
//   try {
//     const user = req.user;
//     const { id } = req.params;

//     const card = await Card.findById(id);
//     console.log(card);

//     if (!card)
//       throw new Error(
//         "Could not delete this card because a card with this ID cannot be found in the database"
//       );

//     // if (!user.isAdmin && user._id != card.user_id)
//     //   throw new Error(
//     //     "Authorization Error: Only the user who created the business card or admin can delete this card"
//     //   );

//     const deletedCardFromDB = await Card.findByIdAndDelete(id);
//     res.send(deletedCardFromDB);
//   } catch (error) {
//     return handleError(res, 404, `Mongoose Error: ${error.message}`);
//   }
// };

// exports.getCards = getCards;
// exports.getCard = getCard;
// exports.getMyCards = getMyCards;
// exports.createCard = createCard;
// exports.editCard = editCard;
// exports.likeCard = likeCard;
// exports.deleteCard = deleteCard;
