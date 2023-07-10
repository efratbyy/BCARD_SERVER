const mongoose = require("mongoose");
// זו הסכמה שצריך לעבור לפני שנשמר במאגר המידע Card
// זו הסכמה שמחייבת את צד לקוח במילוי טפסים Joi
// normalizeCard.js בכדי לגשר על הפער יצרנו את הפונקציה

const URL =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const Image = new mongoose.Schema({
  url: {
    type: String,
    minLength: 14,
    trim: true,
    lowercase: true,
  },
  alt: {
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 256,
    lowercase: true,
  },
});

const Address = new mongoose.Schema({
  state: {
    type: String,
    trim: true,
    maxLength: 256,
    lowercase: true,
  },
  country: {
    type: String,
    minLength: 2,
    maxLength: 256,
    trim: true,
    lowercase: true,
    required: true,
  },
  city: {
    type: String,
    minLength: 2,
    maxLength: 256,
    lowercase: true,
    required: true,
  },
  street: {
    type: String,
    minLength: 2,
    maxLength: 256,
    lowercase: true,
    required: true,
  },
  houseNumber: {
    type: Number,
    minLength: 1,
    required: true,
  },
  zip: {
    type: Number,
  },
});

const schema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 256,
    lowercase: true,
    required: true,
  },
  subtitle: {
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 256,
    lowercase: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 1024,
    lowercase: true,
    required: true,
  },
  phone: {
    type: String,
    match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
    required: true,
  },
  email: {
    type: String,
    match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
  },
  web: {
    type: String,
    match: RegExp(URL),
    trim: Boolean,
  },
  image: Image,
  address: Address,
  bizNumber: {
    type: Number,
    minLength: 7,
    maxLength: 7,
    required: true,
  },
  likes: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Card = mongoose.model("card", schema);

module.exports = Card;
