const { generateBizNumber } = require("./generateBizNumber");

const normalizeCard = async (rawCard, userId) => {
  const image = {
    url:
      rawCard.image.url ||
      "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_1280.jpg",
    alt: rawCard.image.alt || "Business card image",
  };
  const address = {
    ...rawCard.address,
    state: rawCard.address.state || "",
    zip: rawCard.address.zip || 0,
  };

  return {
    ...rawCard,
    web: rawCard.web || "",
    image,
    address,
    bizNumber: rawCard.bizNumber || (await generateBizNumber()),
    user_id: rawCard.user_id || userId,
  };
};

module.exports = normalizeCard;

// // זו הסכמה שצריך לעבור לפני שנשמר במאגר המידע Card
// // זו הסכמה שמחייבת את צד לקוח במילוי טפסים Joi
// // normalizeCard בכדי לגשר על הפער יצרנו את הפונקציה

// const generateBizNumber = require("./generateBizNumber");

// const normalizeCard = async (rawCard, userId) => {
//   const image = {
//     // הדיפולטיבי שהכנסתי פה url-אז אשתמש בו ואם לא אז אשתמש ב url הם לא חובה ולכן נקבע שאם הלקוח הכניס url-ו alt אבל joi-הוא חובה ב image השדה של
//     url:
//       rawCard.image.url ||
//       "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_1280.jpg",
//     alt: rawCard.image.alt || "Business card image", // alt כנ״ל לגבי
//   };
//   const address = {
//     // הוא חובה אבל לא כל השדות בו הם חובה ולכן לכל שדה שהוא לא חובה נקבע שבמידה והלקוח הכניס בו ערך אז נשתמש בערך שהכניס ואם לא הכניס אז נכניס ״״ address
//     ...rawCard.address, // בגלל שחלק מהשדות הם חובה אז קודם כל מביאה אותם ועליהם אוסיף שאר השדות שהם לא חובה
//     state: rawCard.address.state || "",
//     zip: rawCard.address.zip || 0,
//   };

//   // mongodb ואליו אוסיף את שאר השדות שדרושים בכדי שהכרטיס יעבור את הוולידציה של  rawCard מחזירה אובייקט שבו יהיה את
//   return {
//     ...rawCard, // joi זה הכרטיס שהגיע מהלקוח לאחר שעבר את הוולידציה של
//     // שצריך לגשר עליו Card לסכמה של joi הוא לא חובה אז נוצר פער בין הסכמה של web joi-בגלל שב
//     web: rawCard.web || "", // ערך אז אשתמש בו ואם לא אז אכניס ״״ web אם הלקוח הכניס בשדה
//     image, // בהתאם לאובייקט שלמעלה
//     address, // בהתאם לאובייקט שלמעלה
//     bizNumber: rawCard.bizNumber || (await generateBizNumber()), // כנ״ל
//     user_id: rawCard.user_id || userId,
//     // ממה שהמשתמש הכניס או שיקבל אותו ממה שהפונקציה צריכה לקבל בפרופס user_id-או שמקבל את ה
//   };
// };

// module.exports = normalizeCard;
