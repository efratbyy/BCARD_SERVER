const userFromGoogle = {
  name: { first: "", middle: "", last: "" },
  phone: "050-0000000",
  email: "",
  password: "Aa1234!",
  image: {
    url: "https://cdn.pixabay.com/photo/2018/01/26/09/06/people-3108155_1280.jpg",
    alt: "Users image",
  },
  address: {
    state: "",
    country: "aaaaa",
    city: "bbbbb",
    street: "ccccc",
    zip: 0,
    houseNumber: "11111",
  },
  isBusiness: false,
  isGoogleSignup: true,
  isBlocked: false,
  loginFailedCounter: 0,
  blockedTime: new Date(),
};

exports.userFromGoogle = userFromGoogle;
