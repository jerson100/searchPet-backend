const MessageService = require("../services/messageService");
const { toFileArray } = require("../utils/file");

const create = async (req, res) => {
  const { chat, sender, text, cords, type } = req.body;
  const newMessage = await MessageService.create({
    chat,
    sender,
    text,
    images: req.files && req.files.images && toFileArray(req.files),
    cords,
    type,
  });
  return res.status(201).json(newMessage);
};

module.exports = {
  create,
};
