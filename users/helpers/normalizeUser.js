const { generateUserPassword } = require("./bcrypt");

const normalizeUser = (rawUser) => {
  const name = {
    ...rawUser.name,
    middle: rawUser.name.middle || "",
  };

  const image = {
    ...rawUser.image,
    url:
      rawUser.image.url ||
      "https://cdn.pixabay.com/photo/2018/01/26/09/06/people-3108155_1280.jpg",
    alt: rawUser.image.alt || "Users image",
  };

  const address = {
    ...rawUser.address,
    state: rawUser.address.state || "",
  };

  const user = {
    ...rawUser,
    name,
    image,
    address,
    password: generateUserPassword(rawUser.password),
  };

  return user;
};

module.exports = normalizeUser;
