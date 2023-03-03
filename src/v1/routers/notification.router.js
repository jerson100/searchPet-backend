const NotificationController = require("../../controllers/notification.controller");

const { Router } = require("express");
const { authenticate } = require("../../middlewares/authenticate");
const { validateRequest } = require("../../middlewares/validateRequest");
const { validateSchema } = require("../../middlewares/validateSchema");
const {
  NotificationQueryParamsSchema,
  GetByIdNotificationSchema,
} = require("../../models/Notification/Notification.validation");

const NotificationRouter = Router();

NotificationRouter.route("/").get(
  authenticate(),
  validateSchema(NotificationQueryParamsSchema, "query"),
  validateRequest(NotificationController.allByUserId)
);

NotificationRouter.route("/:idNotification/seen").patch(
  authenticate(),
  validateSchema(GetByIdNotificationSchema, "params"),
  validateRequest(NotificationController.updateSeen)
);

module.exports = NotificationRouter;
