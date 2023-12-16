const createHttpError = require("http-errors");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const { UserModel } = require("../models/index.js");

exports.createUser = async (userData) => {
  const { DEFAULT_IMAGE, DEFAULT_STATUS } = process.env;
  const { name, email, password, picture, status } = userData;

  //  check if fields are empty
  if (!name || !email || !password) {
    throw createHttpError.BadRequest("Please fill all fields");
  }
  // check name length
  if (
    !validator.isLength(name, {
      min: 3,
      max: 16,
    })
  ) {
    throw createHttpError.BadRequest(
      "Please make sure your name is between 3 and 16 characters"
    );
  }
  //  check email is valid
  if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest(
      "Please make sure to provide a valid email."
    );
  }
  //  check user is exist
  const checkDb = await UserModel.findOne({ email });
  if (checkDb) {
    throw createHttpError.Conflict("Please try again with a different email.");
  }
  //  check password length
  if (
    !validator.isLength(password, {
      min: 8,
      max: 128,
    })
  ) {
    throw createHttpError(
      "Please make sure your password is between 8 and 128 characters"
    );
  }
  const user = await new UserModel({
    name,
    email,
    password,
    picture: picture || DEFAULT_IMAGE,
    status: status || DEFAULT_STATUS,
  }).save();

  return user;
};
exports.signUser = async (userData) => {
  const { email, password } = userData;
  const user = await UserModel.findOne({ email: email.toLowerCase() });
  //  check if acount not exist
  if (!user) {
    throw createHttpError.NotFound("Invalid credentails.");
  }

  //    compare password
  let passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) throw createHttpError.NotFound("Invalid credentails.");

  return user;
};
