const jwt = require("jsonwebtoken");

const generateAccessToken = (data) => {
    const generatedToken = jwt.sign(data, process.env.PRIVATE_KEY_TOKEN, {  expiresIn: "2h"});
    return generatedToken;
}

const verifyToken = (token) => {
    const verifyToken = jwt.verify(token, process.env.PRIVATE_KEY_TOKEN);
    return verifyToken;
}

module.exports = {
    generateAccessToken,
    verifyToken
}