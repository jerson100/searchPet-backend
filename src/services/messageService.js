const Chat = require("../models/Chat/Chat.model");
const { MessageException } = require("../models/Message/message.exception");
const { Message } = require("../models/Message/Message.model");

const create = async ({ chat, sender, text, image, cords, type }) => {
  const currentChat = await Chat.findOne({ _id: chat, status: 1 });
  if (!currentChat) throw new MessageException();
  const newMessage = await Message.create({
    chat,
    sender,
    text,
    image,
    cords,
    type,
  });
  await newMessage.save();
  return newMessage;
};

module.exports = {
  create,
};
