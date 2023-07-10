const normalizeCard = require("../cards/helpers/normalizeCard");
const validateCard = require("../cards/models/joi/validateCard");
const Card = require("../cards/models/mongoose/Card");
const normalizeUser = require("../users/helpers/normalizeUser");
const registerValidation = require("../users/models/joi/registerValidation");
const User = require("../users/models/mongoose/User");
const data = require("./initialData.json");
const chalk = require("chalk");

const generateInitialCards = async () => {
  // יצירת הכרטיסים הראשונים באתר
  const { cards } = data;
  const userId = "64a1445f8d474975773b9dd1";
  cards.forEach(async (card) => {
    try {
      const { error } = validateCard(card);
      if (error) throw new Error(`Joi Error: ${error.details[0].message}`);

      const normalizedCard = await normalizeCard(card, userId);
      const cardToDB = new Card(normalizedCard);
      await cardToDB.save();
      console.log(
        chalk.greenBright(`Generate Card '${card.title}' Successfully`)
      );
    } catch (error) {
      console.log(
        chalk.redBright(`Initial Data Generate Card Error: ${error.message}`)
      );
    }
  });
};

const generateInitialUsers = async () => {
  // יצירת המשתמשים הראשונים באתר
  const { users } = data;
  users.forEach(async (user) => {
    try {
      const { error } = registerValidation(user);
      if (error) throw new Error(`Joi Error: ${error.details[0].message}`);

      const normalizedUser = await normalizeUser(user);
      const userToDB = new User(normalizedUser);
      await userToDB.save();
      console.log(
        chalk.greenBright(
          `Generate User '${
            user.name.first + " " + user.name.last
          }' Successfully`
        )
      );
    } catch (error) {
      console.log(
        chalk.redBright(`Initial Data Generate User Error: ${error.message}`)
      );
    }
  });
};

exports.generateInitialCards = generateInitialCards;
exports.generateInitialUsers = generateInitialUsers;
