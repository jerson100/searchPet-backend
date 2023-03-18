const { ChatException } = require("../models/Chat/chat.exception");
const Chat = require("../models/Chat/Chat.model");
const User = require("../models/User/user.model");
const { Types } = require("mongoose");
const { Message } = require("../models/Message/Message.model");

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
    // let _urlImageProfile = null;
    // if (type === CHATS.PRIVATE) {
    //   const userAdm = _users.find((us) => users[1] === us._id.toHexString());
    //   _urlImageProfile = userAdm.urlImageProfile;
    // } else if (type === CHATS.GROUP) {
    //   //image x default
    // }
    const newChat = new Chat({
      type,
      users,
      //   name,
      //   urlImageProfile: _urlImageProfile,
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

const getAllByUserId = async ({
  length,
  page,
  isCompleteUserArrays,
  users,
}) => {
  users = users.map((us) => Types.ObjectId(us));
  const qusers = isCompleteUserArrays
    ? {
        $all: users,
        $size: users.length,
      }
    : {
        $all: users,
      };
  const chats = await Chat.aggregate([
    {
      $match: { users: qusers },
    },
    {
      $lookup: {
        from: "users",
        localField: "users",
        foreignField: "_id",
        as: "users",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "admin",
        foreignField: "_id",
        as: "admin",
      },
    },
    {
      $unwind: {
        path: "$admin",
      },
    },
    {
      $project: {
        "users.password": 0,
        "users.password": 0,
        "users.birthday": 0,
        "users.accountType": 0,
        "users.district": 0,
        "users.location": 0,
        "users.address": 0,
        "users.status": 0,
        "admin.password": 0,
        "admin.password": 0,
        "admin.birthday": 0,
        "admin.accountType": 0,
        "admin.district": 0,
        "admin.location": 0,
        "admin.address": 0,
        "admin.status": 0,
      },
    },
    {
      $addFields: {
        urlImageProfile: {
          $cond: {
            if: {
              $eq: ["$type", "private"],
            },
            then: {
              $reduce: {
                input: "$users",
                initialValue: "",
                in: {
                  $cond: {
                    if: {
                      $ne: ["$$this._id", Types.ObjectId(users[0])],
                    },
                    then: "$$this.urlImageProfile",
                    else: "$$value",
                  },
                },
              },
            },
            else: "$urlImageProfile",
          },
        },
        name: {
          $cond: {
            if: {
              $eq: ["$type", "private"],
            },
            then: {
              $reduce: {
                input: "$users",
                initialValue: "",
                in: {
                  $cond: {
                    if: {
                      $ne: ["$$this._id", Types.ObjectId(users[0])],
                    },
                    then: "$$this.username",
                    else: "$$value",
                  },
                },
              },
            },
            else: "$name",
          },
        },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $skip: (page >= 1 ? page - 1 : 0) * length,
    },
    {
      $limit: length,
    },
  ]);
  return chats;
};

// const getAllByUserId = async ({
//   length,
//   page,
//   isCompleteUserArrays,
//   users,
// }) => {
//   const qusers = isCompleteUserArrays
//     ? {
//         $all: users,
//         $size: users.length,
//       }
//     : {
//         $all: users,
//       };
//   const chats = await Chat.find({
//     status: 1,
//     users: qusers,
//   })
//     .populate({
//       path: "users",
//       match: {
//         status: 1,
//       },
//       select:
//         "-password -birthday -accountType -district -location -address -status",
//     })
//     .populate({
//       path: "admin",
//       select:
//         "-password -birthday -accountType -district -location -address -status",
//     })
//     .sort({ createdAt: -1 })
//     .skip((page >= 1 ? page - 1 : 0) * length)
//     .limit(length);
//   return chats;
// };

const getMessagesByIdChat = async (idChat) => {
  const currentChat = await Chat.findOne({ _id: idChat, status: 1 });
  if (!currentChat) throw new NotFoundChatException();
  const messages = await Message.find({ chat: idChat }).populate({
    path: "sender",
    select:
      "-password -birthday -accountType -district -location -address -status",
  });
  return messages;
};

module.exports = { create, getAllByUserId, getMessagesByIdChat };
