class MessageException extends Error {
  constructor(msg = "No se pudo crear el mensaje", status = 400) {
    super(msg);
    this.name = "MessageException";
    this.status = status;
  }
}

class NotFoundMessageException extends Error {
  constructor(
    msg = "No se encontró el mensaje para el id especificado",
    status = 404
  ) {
    super(msg);
    this.name = "NotFoundMessageException";
    this.status = status;
  }
}

module.exports = {
  MessageException,
  NotFoundMessageException,
};
