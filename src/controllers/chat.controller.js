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
  const { length, page, isCompleteUserArrays, users } = req.query;
  const { _id: userId } = req.user;
  const chats = await ChatService.getAllByUserId({
    isCompleteUserArrays: !users?.length ? false : isCompleteUserArrays,
    users: !users?.length ? [userId] : users,
    length,
    page,
  });
  res.json(chats);
};

const getMessagesByIdChat = async (req, res) => {
  const { idChat } = req.params;
  const messages = await ChatService.getMessagesByIdChat(idChat);
  return res.json(messages);
};

module.exports = {
  create,
  getAllByUserId,
  getMessagesByIdChat,
};
