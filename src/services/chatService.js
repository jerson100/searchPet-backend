const { ChatException } = require("../models/Chat/chat.exception");
const Chat = require("../models/Chat/Chat.model");
const User = require("../models/User/user.model");
const { CHATS } = require("../utils/consts");

const create = async ({ name, type, users, admin }) => {
  const _users = await User.find(
    {
      _id: users,
      status: 1,
    },
    {
      accountType: 0,
      address: 0,
      district: 0,
      birthday: 0,
      location: 0,
      password: 0,
      status: 0,
      registerToken: 0,
    }
  );
  if (_users.lengh === users.lengh) {
    let _urlImageProfile = null;
    if (type === CHATS.PRIVATE) {
      const userAdm = _users.find((us) => {
        return users[1] === us._id.toHexString();
      });
      _urlImageProfile = userAdm.urlImageProfile;
    } else if (type === CHATS.GROUP) {
      //image x default
    }
    const newChat = await new Chat({
      type,
      users,
      name,
      urlImageProfile: _urlImageProfile,
      admin,
    });
    await newChat.save();
    delete newChat._doc.status;
    newChat.users = _users;
    return newChat;
  } else {
    throw new ChatException(
      "No se pudo crear el chat porque uno de los usuarios no existe o se encuentra inactivo"
    );
  }
};

const getAllByUserId = async ({ userId, length, page }) => {
  const chats = await Chat.find({
    status: 1,
    users: userId,
  })
    .populate({
      path: "users",
      match: {
        status: 1,
      },
      select:
        "-password -birthday -accountType -district -location -address -status",
    })
    .populate({
      path: "admin",
      select:
        "-password -birthday -accountType -district -location -address -status",
    })
    .sort({ createdAt: -1 })
    .skip((page >= 1 ? page - 1 : 0) * length)
    .limit(length);
  return chats;
};

module.exports = { create, getAllByUserId };
