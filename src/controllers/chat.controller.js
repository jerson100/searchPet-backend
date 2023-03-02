const ChatService = require("../services/chatService");

const create = async (req, res) => {
  const { _id: userId } = req.user;
  const { name, type, users } = req.body;
  const newChat = await ChatService.create({
    admin: userId,
    name,
    type,
    users,
  });
  res.status(201).json(newChat);
};

const getAllByUserId = async (req, res) => {
  const { length, page } = req.query;
  const { _id: userId } = req.user;
  const chats = await ChatService.getAllByUserId({ lengh, page, userId });
  res.json(chats);
};

module.exports = {
  create,
  getAllByUserId,
};
