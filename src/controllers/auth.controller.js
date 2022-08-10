const AuthService = require("../services/authService");

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await AuthService.login(email, password);
    return res.json(user);
};

const getToken = async (req, res) => {
    const idUser = req.user._id;
    const usandtoken = await AuthService.getToken(idUser);
    return res.json(usandtoken);
};

module.exports = {
    login,
    getToken
}