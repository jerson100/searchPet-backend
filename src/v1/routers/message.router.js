const MessageController = require("../../controllers/message.controller");
const { authenticate } = require("../../middlewares/authenticate");
const { validateFile } = require("../../middlewares/validateFile");
const { validateRequest } = require("../../middlewares/validateRequest");
const { validateSchema } = require("../../middlewares/validateSchema");
const {
  CreateMessageValidationSchema,
} = require("../../models/Message/message.validation");
const CONSTS = require("../../utils/consts");

const MessageRouter = require("express").Router();

MessageRouter.route("/").post(
  authenticate(),
  validateFile(
    {
      limits: {
        fileSize: 10 * 1024 * 1024,
        files: 4,
      },
      responseOnLimit: JSON.stringify({
        message: "El tamaño límite del archivo es 10mb",
      }),
    },
    CONSTS.FILES.MIME_TYPE.IMAGES
  ),
  validateSchema(CreateMessageValidationSchema, "body"),
  validateRequest(MessageController.create)
);

module.exports = MessageRouter;
