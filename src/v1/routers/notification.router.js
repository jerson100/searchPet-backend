const NotificationController = require("../../controllers/notification.controller");

const { Router } = require("express");
const { authenticate } = require("../../middlewares/authenticate");
const { validateRequest } = require("../../middlewares/validateRequest");
const { validateSchema } = require("../../middlewares/validateSchema");
const {
  NotificationQueryParamsSchema,
} = require("../../models/Notification/Notification.validation");

const NotificationRouter = Router();

NotificationRouter.route("/").get(
  authenticate(),
  validateSchema(NotificationQueryParamsSchema, "query"),
  validateRequest(NotificationController.allByUserId)
);

module.exports = NotificationRouter;
