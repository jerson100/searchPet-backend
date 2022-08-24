const Joi = require("joi");

const CreateTypePetSchemaValidation = Joi.object({
    type: Joi.string().min(2).max(30).required(),
    description: Joi.string()
});

const PutTypePetSchemaValidation = Joi.object({
    type: Joi.string().min(2).max(30).required(),
    description: Joi.string().required()
});

const PatchTypePetSchemaValidation = Joi.object({
    type: Joi.string().min(2).max(30),
    description: Joi.string()
});

const GetTypePetSchemaValidation = Joi.object({
    idTypePet: Joi.string().regex(/^[a-fA-F\d]{24}$/).required()
})

module.exports = {
    CreateTypePetSchemaValidation,
    PutTypePetSchemaValidation,
    PatchTypePetSchemaValidation,
    GetTypePetSchemaValidation
}