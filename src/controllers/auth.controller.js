const User = require("../models/User/user.model");
const {verifyPassword} = require("../utils/password");
const {generateAccessToken, verifyToken} = require("../utils/token");

const login = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({
        username: username
    });
    if(!user){
        return res.status(401).json({
            message: "Usuario o contraseña incorrecto"
        })
    }
    const ePass = await verifyPassword(password, user.password);
    if(!ePass){
        return res.status(401).json({
            message: "Usuario o contraseña incorrecto"
        })
    }
    const userD = user._doc;
    delete userD.password;
    const accessToken =  generateAccessToken({
        _id: userD._id,
        username: userD.username,
        name: userD.name,
        paternalSurname: userD.paternalSurname,
        maternalSurname: userD.maternalSurname,
        typeUser: userD.typeUser  || "administrador"
    });
    return res.json({
        accessToken: accessToken,
        user: userD
    });
};

module.exports = {
    login
}