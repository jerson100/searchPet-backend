const jwt = require("jsonwebtoken");

const generateAccessToken = (data) => {
  const generatedToken = jwt.sign(data, process.env.PRIVATE_KEY_TOKEN, {
    expiresIn: "1h",
  });
  return generatedToken;
};

const generateRegisterToken = (data) => {
  return jwt.sign(data, process.env.PRIVATE_REGISTER_KEY_TOKEN);
};

const verifyRegisterToken = (token) => {
  return jwt.verify(token, process.env.PRIVATE_REGISTER_KEY_TOKEN);
};

const verifyToken = (token) => {
  const verifyToken = jwt.verify(token, process.env.PRIVATE_KEY_TOKEN);
  return verifyToken;
};

module.exports = {
  generateAccessToken,
  verifyToken,
  generateRegisterToken,
  verifyRegisterToken,
};
