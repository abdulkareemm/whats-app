const createHttpError = require("http-errors");
const { createUser } = require("../service/auth.service");
const { generateToken } = require("../service/token.service");


const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  DEFAULT_IMAGE,
  DEFAULT_STATUS,
} = process.env;

exports.register = async (req, res, next) => {
  try {
    const newUser = await createUser(req.body);

    const access_token = await generateToken(
      { userId: newUser._id },
      "1d",
      ACCESS_TOKEN_SECRET
    );
    const refresh_token = await generateToken(
      { userId: newUser._id },
      "30d",
      REFRESH_TOKEN_SECRET
    );
    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/api/v1/auth/refresh_token",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      msg: "register success",
      user: {
        _id: newUser._id,
        name: newUser.name,
        status: newUser.status,
        picture: newUser.picture,
        email: newUser.email,
        token: access_token,
      },
    });
  } catch (error) {
    next(error);
  }
};