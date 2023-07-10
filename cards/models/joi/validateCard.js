const Joi = require("joi");
// זו הסכמה שמחייבת את צד לקוח במילוי טפסים Joi
// זו הסכמה שצריך לעבור לפני שנשמר במאגר המידע Card
// normalizeCard.js בכדי לגשר על הפער יצרנו את הפונקציה

const validateCard = (card) => {
  const URL =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

  const schema = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    subtitle: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(2).max(1024).required(),
    phone: Joi.string() // רג׳קס עובד רק עם סטרינג
      .ruleset.regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/) // קובע מה יהיו הדרישות
      .rule({ message: 'card "phone" mast be a valid phone number' }) // ruleset-יופעל במידה ולא יעמדו בדרישות שנקבעו ב
      .required(),
    email: Joi.string()
      .ruleset.pattern(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
      )
      .rule({ message: 'card "email" mast be a valid email' })
      .required(),
    web: Joi.string()
      .ruleset.regex(URL)
      .rule({ message: 'card "web" mast be a valid url' })
      .allow(""),
    image: Joi.object()
      .keys({
        url: Joi.string()
          .ruleset.regex(URL)
          .rule({ message: 'card image "url" mast be a valid url' })
          .allow(""),
        alt: Joi.string().max(256).allow(""),
      })
      .required(),
    address: Joi.object()
      .keys({
        state: Joi.string().allow(""),
        country: Joi.string().min(2).max(256).required(),
        city: Joi.string().min(2).max(256).required(),
        street: Joi.string().min(2).max(256).required(),
        houseNumber: Joi.number().min(1).required(),
        zip: Joi.number().required().allow(""),
      })
      .required(),
    bizNumber: Joi.number().allow(""),
    user_id: Joi.string().allow(""),
  });
  return schema.validate(card); // schema מחזירה אובייקט שעבר את הוולידציה של validate המטודה
};

module.exports = validateCard;
