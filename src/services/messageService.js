const fs = require("fs-extra");
const { upload } = require("../configs/cloudinary");
const Chat = require("../models/Chat/Chat.model");
const { MessageException } = require("../models/Message/message.exception");
const { Message } = require("../models/Message/Message.model");
const User = require("../models/User/user.model");

const create = async ({ chat, sender, text, images, cords, type }) => {
  const currentChat = await Chat.findOne({ _id: chat, status: 1 });
  if (!currentChat) throw new MessageException();

  const imageIds = [];
  const document = {
    chat,
    sender,
    text,
    cords,
    type,
  };
  if (images) {
    for (let i = 0; i < images.length; i++) {
      try {
        const { secure_url } = await upload(
          images[i].tempFilePath,
          "sPet/messages"
        );
        imageIds.push(secure_url);
        fs.remove(images[i].tempFilePath);
      } catch (e) {
        throw new MessageException(
          "No se pudo crear el mensaje porque no se logró subir las imágenes, vuelva a intentarlo luego."
        );
      }
    }
    document.images = imageIds;
  }
  const newMessage = new Message(document);
  const userSender = await User.findOne(
    { _id: sender },
    { password: 0, status: 0 }
  );
  await newMessage.save();
  return { ...newMessage._doc, sender: userSender };
};

module.exports = {
  create,
};
