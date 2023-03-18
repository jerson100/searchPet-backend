const ChatController = require("../../controllers/chat.controller");
const { authenticate } = require("../../middlewares/authenticate");
// const { authorizeMyResource } = require("../../middlewares/authorize");
const { validateRequest } = require("../../middlewares/validateRequest");
const { validateSchema } = require("../../middlewares/validateSchema");
// const Chat = require("../../models/Chat/Chat.model");
const {
  CreateChatSchema,
  QueryParamsChatsSchema,
  GetMessagesSchemaValidation,
} = require("../../models/Chat/chat.validation");
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
    validateSchema(QueryParamsChatsSchema, "query"),
    validateRequest(ChatController.getAllByUserId)
    // authorizeMyResource(Chat, "users", [USER_CONSTS.TYPES.USER], "_id", "user")
  );

ChatRouter.route("/:idChat/messages").get(
  authenticate(),
  validateSchema(GetMessagesSchemaValidation, "params"),
  validateRequest(ChatController.getMessagesByIdChat)
);

module.exports = ChatRouter;
