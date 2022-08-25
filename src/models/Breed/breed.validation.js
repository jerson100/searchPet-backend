const Joi = require("joi");

const CreateBreedSchemaValidation = Joi.object(
    {
        typePet: Joi.string().regex(/^[a-fA-F\d]{24}$/).required(),
        name: Joi.string().min(2).max(40).required(),
        description: Joi.string().max(300),
        characteristics: Joi.array().items(Joi.string()),
        images: Joi.array().items(Joi.string()),
    }
);

const UpdateBreedSchemaValidation = Joi.object(
    {
        typePet: Joi.string().regex(/^[a-fA-F\d]{24}$/).required(),
        name: Joi.string().min(2).max(40).required(),
        description: Joi.string().max(300).required(),
        characteristics: Joi.array().items(Joi.string()).required(),
        images: Joi.array().items(Joi.string()).required(),
    }
);


const PatchBreedSchemaValidation = Joi.object(
    {
        typePet: Joi.string().regex(/^[a-fA-F\d]{24}$/),
        name: Joi.string().min(2).max(40),
        description: Joi.string().max(300),
        characteristics: Joi.array().items(Joi.string()),
        images: Joi.array().items(Joi.string()),
    }
);

const GetBreedSchemaValidation = Joi.object({
    idBreed: Joi.string().regex(/^[a-fA-F\d]{24}$/).required()
})

module.exports = {
    CreateBreedSchemaValidation,
    UpdateBreedSchemaValidation,
    PatchBreedSchemaValidation,
    GetBreedSchemaValidation
}