const bcrypt = require("bcrypt")

const generatePassword = async (plainText) => {
    const password = await bcrypt.hash(plainText, 10);
    return password;
};

module.exports = {
    generatePassword
}