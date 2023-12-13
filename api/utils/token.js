const jwt = require("jsonwebtoken");

exports.sign = async (payload, expiresIn, secret) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      secret,
      {
        expiresIn,
      },
      (error, token) => {
        if (error) reject(error);
        else resolve(token);
      }
    );
  });
};

exports.verify = async (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, payload) => {
      if (error) resolve(null);
      else resolve(payload);
    });
  });
};
