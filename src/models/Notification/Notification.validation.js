const Joi = require("joi");
const { NOTIFICATIONS } = require("../../utils/consts");

const CreateNotificationSchema = Joi.object({
  from: Joi.string()
    .regex(/^[a-fA-F\d]{24}$/)
    .required(),
  to: Joi.string()
    .regex(/^[a-fA-F\d]{24}$/)
    .required(),
  type: Joi.string().valid(NOTIFICATIONS.LOST_PET_COMMENT).required(),
  content: Joi.string().max(300).allow("").trim(),
});

const GetByIdNotificationSchema = Joi.object({
  idNotification: Joi.string()
    .regex(/^[a-fA-F\d]{24}$/)
    .required(),
});

const NotificationQueryParamsSchema = Joi.object({
  length: Joi.number().default(5),
  page: Joi.number().default(1),
});

module.exports = {
  CreateNotificationSchema,
  GetByIdNotificationSchema,
  NotificationQueryParamsSchema,
};
