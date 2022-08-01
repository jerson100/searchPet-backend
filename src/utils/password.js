const bcrypt = require("bcrypt")

const generatePassword = async (plainText) => {
    const password = await bcrypt.hash(plainText, 10);
    return password;
};

const verifyPassword = async (plainText, encryptedText) => {
    const equalsP = await bcrypt.compare(plainText, encryptedText);
    return equalsP;
}

module.exports = {
    generatePassword,
    verifyPassword
}