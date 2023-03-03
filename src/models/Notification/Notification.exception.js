class NotificationException extends Error {
  constructor(msg = "No se pudo crear la notificación", status = 400) {
    super(msg);
    this.name = "NotificationException";
    this.status = status;
  }
}

class NotFoundNotificationException extends Error {
  constructor(
    msg = "No se encontró la notificación para el id especificado",
    status = 404
  ) {
    super(msg);
    this.name = "NotFoundNotificationException";
    this.status = status;
  }
}

module.exports = {
  NotificationException,
  NotFoundNotificationException,
};
