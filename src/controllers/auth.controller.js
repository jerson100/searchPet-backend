const AuthService = require("../services/authService");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await AuthService.login(email, password);
  return res.json(user);
};

const getToken = async (req, res) => {
  const idUser = req.user._id;
  const usandtoken = await AuthService.getToken(idUser);
  return res.json(usandtoken);
};

const googleLogin = async (req, res) => {
  const { token } = req.query;
  const user = await AuthService.googleLogin(token);
  return res.json(user);
};

const facebookLogin = async (req, res) => {
  const { email, name, urlImageProfile } = req.body;
  const user = await AuthService.facebookLogin({
    email,
    name,
    urlImageProfile,
  });
  return res.json(user);
};

const verifyRegisterToken = async (req, res) => {
  const { token } = req.body;
  await AuthService.verifyRegisterToken(token);
  return res.status(200).send();
};

module.exports = {
  login,
  getToken,
  googleLogin,
  facebookLogin,
  verifyRegisterToken,
};
