const Joi = require("joi");

const CreateLostPetCommentSchema = Joi.object({
    lostPet: Joi.string().regex(/^[a-fA-F\d]{24}$/).required(),
    description: Joi.string().min(1).max(250).trim().required(),
    locations: Joi.array().items(Joi.array().items(Joi.number()).min(2).max(2)).min(0)
});

const GetLostPetCommentSchema = Joi.object({
    idLostPetComment: Joi.string().regex(/^[a-fA-F\d]{24}$/).required()
})

module.exports = {
    CreateLostPetCommentSchema,
    GetLostPetCommentSchema
}
