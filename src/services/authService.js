const User = require("../models/User/user.model");
const {verifyPassword} = require("../utils/password");
const {generateAccessToken} = require("../utils/token");
const {LoginUserException, UnauthorizedUserException} = require("../models/User/User.exception");

const login = async (email, password) => {
    const user = await User.findOne({
        email: email,
        status: 1
    }, {status:0});
    if(!user)throw new LoginUserException();
    const ePass = await verifyPassword(password, user._doc.password);
    if(!ePass)throw new LoginUserException();
    const accessToken =  generateAccessToken({
        _id: user._doc._id,
        username: user._doc.username,
        name: user._doc.name,
        paternalSurname: user._doc.paternalSurname,
        maternalSurname: user._doc.maternalSurname,
        typeUser: user._doc.typeUser
    });
    delete user._doc.password;
    delete user._doc.status;
    return {
        accessToken: accessToken,
        user: user._doc
    };
};

const getToken = async (idUser) => {
    const user = await User.findOne({
        _id: idUser,
        status: 1
    }, {status:0});
    if(!user) throw new UnauthorizedUserException();
    delete user._doc.password;
    delete user._doc.status;
    return {
        user: user._doc
    };
};

module.exports = {
    login,
    getToken
}