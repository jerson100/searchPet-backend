const Joi = require("joi");
const { CHATS } = require("../../utils/consts");

const CreateChatSchema = Joi.object({
  name: Joi.string(),
  type: Joi.string().valid(CHATS.GROUP, CHATS.PRIVATE),
  users: Joi.array()
    .items(Joi.string().regex(/^[a-fA-F\d]{24}$/))
    .min(2),
});

module.exports = {
  CreateChatSchema,
};
