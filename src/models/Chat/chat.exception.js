class ChatException extends Error {
  constructor(msg = "No se pudo crear el chat", status = 400) {
    super(msg);
    this.name = "ChatException";
    this.status = status;
  }
}

class NotFoundChatException extends Error {
  constructor(
    msg = "No se encontró el chat para el id especificado",
    status = 404
  ) {
    super(msg);
    this.name = "NotFoundChatException";
    this.status = status;
  }
}

module.exports = {
  ChatException,
  NotFoundChatException,
};
