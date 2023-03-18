const MessageController = require("../../controllers/message.controller");
const { authenticate } = require("../../middlewares/authenticate");
const { validateRequest } = require("../../middlewares/validateRequest");
const { validateSchema } = require("../../middlewares/validateSchema");
const {
  CreateMessageValidationSchema,
} = require("../../models/Message/message.validation");
const MessageRouter = require("express").Router();

MessageRouter.route("/").post(
  authenticate(),
  validateSchema(CreateMessageValidationSchema, "body"),
  validateRequest(MessageController.create)
);

module.exports = MessageRouter;
