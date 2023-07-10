const mongoose = require("mongoose");

const Name = new mongoose.Schema({
  first: {
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 256,
    lowercase: true,
    required: true,
  },
  middle: {
    type: String,
    trim: true,
    maxLength: 256,
    lowercase: true,
  },
  last: {
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 256,
    lowercase: true,
    required: true,
  },
});

const Image = new mongoose.Schema({
  url: {
    type: String,
    trim: true,
    lowercase: true,
  },
  alt: {
    type: String,
    trim: true,
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
    trim: true,
    minLength: 2,
    maxLength: 256,
    lowercase: true,
    required: true,
  },
  city: {
    type: String,
    trim: true,
    minLength: 2,
    maxLength: 256,
    lowercase: true,
    required: true,
  },
  street: {
    type: String,
    trim: true,
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
  name: Name,
  phone: {
    type: String,
    required: true,
    match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
  },
  email: {
    type: String,
    required: true,
    match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    match: RegExp(
      /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
    ),
    required: true,
    trim: true,
  },
  image: Image,
  address: Address,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBusiness: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", schema);

module.exports = User;
