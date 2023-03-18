const Joi = require("joi");
const { CHATS } = require("../../utils/consts");

const CreateChatSchema = Joi.object({
  name: Joi.string(),
  type: Joi.string().valid(CHATS.GROUP, CHATS.PRIVATE).required(),
  users: Joi.array()
    .items(Joi.string().regex(/^[a-fA-F\d]{24}$/))
    .min(2)
    .required(),
});

const QueryParamsChatsSchema = Joi.object({
  length: Joi.number().min(1).default(50),
  page: Joi.number().min(1).default(1),
  users: Joi.array()
    .items(Joi.string().regex(/^[a-fA-F\d]{24}$/))
    .min(0),
  isCompleteUserArrays: Joi.bool().default(true),
});

const GetMessagesSchemaValidation = Joi.object({
  idChat: Joi.string()
    .regex(/^[a-fA-F\d]{24}$/)
    .required(),
});

module.exports = {
  CreateChatSchema,
  QueryParamsChatsSchema,
  GetMessagesSchemaValidation,
};
