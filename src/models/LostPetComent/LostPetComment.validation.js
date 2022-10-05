const Joi = require("joi");

const CreateLostPetCommentSchema = Joi.object({
    lostPet: Joi.string().regex(/^[a-fA-F\d]{24}$/).required(),
    description: Joi.string().min(1).max(250).trim().required(),
    location: Joi.object({
      latitude: Joi.string(),
      longitude: Joi.string(),
    })
});

module.exports = {
    CreateLostPetCommentSchema
}
