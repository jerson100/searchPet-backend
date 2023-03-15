const MessageService = require("../services/messageService");

const create = async (req, res) => {
  const { chat, sender, text, image, cords, type } = req.body;
  const newMessage = await MessageService.create({
    chat,
    sender,
    text,
    image,
    cords,
    type,
  });
  return res.status(201).json(newMessage);
};

module.exports = {
  create,
};
