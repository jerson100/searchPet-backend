const User = require("../models/User/user.model");
const {verifyPassword} = require("../utils/password");
const {generateAccessToken, verifyToken} = require("../utils/token");

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({
        email: email,
        status: 1
    }, {status:0});
    if(!user){
        return res.status(400).json({
            message: "Email o contraseña incorrectos"
        })
    }
    const ePass = await verifyPassword(password, user._doc.password);
    if(!ePass){
        return res.status(400).json({
            message: "Email o contraseña incorrectos"
        })
    }
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
    return res.json({
        accessToken: accessToken,
        user: user._doc
    });
};

const getToken = async (req, res) => {
    const idUser = req.user._id;
    const user = await User.findOne({
        _id: idUser,
        status: 1
    }, {status:0});
    if(!user) return res.status(401).send();
    delete user._doc.password;
    delete user._doc.status;
    return res.json({
        user: user._doc
    });
};

module.exports = {
    login,
    getToken
}