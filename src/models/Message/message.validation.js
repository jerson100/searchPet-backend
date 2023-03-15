const Joi = require("joi");
const { MESSAGES } = require("../../utils/consts");

const CreateMessageValidationSchema = Joi.object({
  chat: Joi.string()
    .regex(/^[a-fA-F\d]{24}(?:,[a-fA-F\d]{24}){0,9}$/)
    .required(),
  sender: Joi.string()
    .regex(/^[a-fA-F\d]{24}(?:,[a-fA-F\d]{24}){0,9}$/)
    .required(),
  type: Joi.string()
    .valid(MESSAGES.TYPES.COORDS, MESSAGES.TYPES.IMAGE, MESSAGES.TYPES.TEXT)
    .required(),
  text: Joi.string(),
  // image: Joi.
  //cords
});

module.exports = {
  CreateMessageValidationSchema,
};
