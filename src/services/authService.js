const User = require("../models/User/user.model");
const { verifyPassword } = require("../utils/password");
const { generateAccessToken } = require("../utils/token");
const {
  LoginUserException,
  UnauthorizedUserException,
} = require("../models/User/User.exception");
const { OAuth2Client } = require("google-auth-library");
const { Notification } = require("../models/Notification/Notification.model");

const login = async (email, password) => {
  const user = await User.findOne({
    email: email,
    accountType: "normal",
  });
  if (!user) throw new LoginUserException();
  if (user.status === 0) throw new LoginUserException("La cuenta no existe");
  const ePass = await verifyPassword(password, user._doc.password);
  if (!ePass) throw new LoginUserException();
  if (user.status === 3)
    throw new LoginUserException(
      "Necesita confirmar su cuenta, para ello haga click en el link que se le envió a su correo."
    );
  const accessToken = generateAccessToken({
    _id: user._doc._id,
    username: user._doc.username,
    name: user._doc.name,
    paternalSurname: user._doc.paternalSurname,
    maternalSurname: user._doc.maternalSurname,
    typeUser: user._doc.typeUser,
    accountType: user._doc.accountType,
  });
  delete user._doc.password;
  delete user._doc.status;
  const seen_notifications = await Notification.find({
    to: user._doc._id,
    seen: false,
  }).count();
  return {
    accessToken: accessToken,
    user: user._doc,
    seen_notifications: seen_notifications,
  };
};

const getToken = async (idUser) => {
  const user = await User.findOne(
    {
      _id: idUser,
      status: 1,
    },
    { status: 0 }
  );
  if (!user) throw new UnauthorizedUserException();
  delete user._doc.password;
  delete user._doc.status;
  const seen_notifications = await Notification.find({
    to: user._doc._id,
    seen: false,
  }).count();
  return {
    user: user._doc,
    seen_notifications: seen_notifications,
  };
};

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const googleLogin = async (token) => {
  let payload;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    payload = ticket.getPayload();
  } catch (e) {
    throw new LoginUserException(
      "No se pudo iniciar sesión con la cuenta de google especificada."
    );
  }
  let user = await User.findOne({ email: payload.email });
  const family_name = `${payload.family_name} `.split(" ");
  const doc = {
    email: payload.email,
    name: payload.given_name,
    paternalSurname: family_name[0],
    maternalSurname: family_name[1],
    accountType: "google",
    urlImageProfile: payload.picture,
  };
  if (!user) {
    user = await User({
      ...doc,
      username: `${payload.given_name}${new Date().getTime()}`
        .replaceAll(" ", "")
        .toLowerCase(),
    });
    await user.save();
  } else {
    user = await User.findOneAndUpdate(
      {
        email: doc.email,
        status: 1,
        accountType: "google",
      },
      { $set: doc },
      {
        new: true,
      }
    );
    if (!user) {
      throw new LoginUserException(
        "La cuenta ya está registrada con otro método, porfavor inicie sesión con ese método"
      );
    }
  }
  if (user.status !== 1) {
    throw new LoginUserException(
      "Cuenta inactiva, si cree que esto es un error, comuníquese con los administradores."
    );
  }
  const accessToken = generateAccessToken({
    _id: user._doc._id,
    username: user._doc.username,
    name: user._doc.name,
    paternalSurname: user._doc.paternalSurname,
    maternalSurname: user._doc.maternalSurname,
    typeUser: user._doc.typeUser,
    accountType: user._doc.accountType,
  });
  delete user._doc.password;
  delete user._doc.status;
  const seen_notifications = await Notification.find({
    to: user._doc._id,
    seen: false,
  }).count();
  return {
    accessToken,
    user: user._doc,
    seen_notifications,
  };
};

const facebookLogin = async ({ email, name, urlImageProfile }) => {
  let user = await User.findOne({ email: email });
  const family_name = `${name}  `.split(" ");
  const doc = {
    email: email,
    name: family_name[0],
    paternalSurname: family_name[1],
    maternalSurname: family_name[2],
    accountType: "facebook",
    urlImageProfile: urlImageProfile,
  };
  if (!user) {
    user = await User({
      ...doc,
      username: `${doc.name}${new Date().getTime()}`
        .replaceAll(" ", "")
        .toLowerCase(),
    });
    await user.save();
  } else {
    user = await User.findOneAndUpdate(
      {
        email: doc.email,
        accountType: "facebook",
      },
      { $set: doc },
      {
        new: true,
      }
    );
    if (!user) {
      throw new LoginUserException(
        "La cuenta ya está registrada con otro método, porfavor inicie sesión con ese método"
      );
    }
  }
  if (user.status !== 1) {
    throw new LoginUserException(
      "Cuenta inactiva, si cree que esto es un error, comuníquese con los administradores."
    );
  }
  const accessToken = generateAccessToken({
    _id: user._doc._id,
    username: user._doc.username,
    name: user._doc.name,
    paternalSurname: user._doc.paternalSurname,
    maternalSurname: user._doc.maternalSurname,
    typeUser: user._doc.typeUser,
    accountType: user._doc.accountType,
  });
  delete user._doc.password;
  delete user._doc.status;
  const seen_notifications = await Notification.find({
    to: user._doc._id,
    seen: false,
  }).count();
  return {
    accessToken,
    user: user._doc,
    seen_notifications,
  };
};

const verifyRegisterToken = async (token) => {
  const us = await User.findOneAndUpdate(
    {
      registerToken: token,
      status: 3,
    },
    {
      $unset: {
        registerToken: "",
      },
      $set: {
        status: 1,
      },
    }
  );
  if (!us) throw new LoginUserException("El token no es válido");
};

module.exports = {
  login,
  getToken,
  googleLogin,
  facebookLogin,
  verifyRegisterToken,
};
