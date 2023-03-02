const ChatController = require("../../controllers/chat.controller");
const { authenticate } = require("../../middlewares/authenticate");
// const { authorizeMyResource } = require("../../middlewares/authorize");
const { validateRequest } = require("../../middlewares/validateRequest");
const { validateSchema } = require("../../middlewares/validateSchema");
// const Chat = require("../../models/Chat/Chat.model");
const { CreateChatSchema } = require("../../models/Chat/chat.validation");
// const { User: USER_CONSTS } = require("../../utils/consts");

const Router = require("express").Router;

const ChatRouter = Router();

ChatRouter.route("/")
  .post(
    authenticate(),
    validateSchema(CreateChatSchema, "body"),
    validateRequest(ChatController.create)
  )
  .get(
    authenticate(),
    validateRequest(ChatController.getAllByUserId)
    // authorizeMyResource(Chat, "users", [USER_CONSTS.TYPES.USER], "_id", "user")
  );

module.exports = {
  ChatRouter,
};
