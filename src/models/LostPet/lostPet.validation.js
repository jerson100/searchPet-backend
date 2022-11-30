const Joi = require("joi");

const CreateLostPetSchemaValidation = Joi.object({
    // user: Joi.string().regex(/^[a-fA-F\d]{24}$/).required(),
    // pets: Joi.array().items(Joi.string().regex(/^[a-fA-F\d]{24}$/)).min(1).required(),
    pets: Joi.string().regex(/^[a-fA-F\d]{24}(?:,[a-fA-F\d]{24}){0,9}$/).required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    description:  Joi.string().max(500).empty(''),
});

const PutLostPetSchemaValidation = Joi.object({
    pets: Joi.array().items(Joi.string().regex(/^[a-fA-F\d]{24}$/)).min(0).required(),
    location: Joi.object({
        latitude: Joi.number(),
        longitude: Joi.number(),
    }).allow({},null).required(),
    description:  Joi.string().max(500).allow("").trim().required()
});

const PatchLostPetSchemaValidation = Joi.object({
    pets: Joi.array().items(Joi.string().regex(/^[a-fA-F\d]{24}$/)).min(1),
    location: Joi.object({
        latitude: Joi.number(),
        longitude: Joi.number(),
    }),
    description:  Joi.string().max(500).allow("").trim()
});

const GetLostPetSchemaValidation = Joi.object({
    idLostPet: Joi.string().regex(/^[a-fA-F\d]{24}$/)
});

const PetLostPetSchemaValidation = Joi.object({
    length: Joi.number().default(2),
    page: Joi.number()
})

const LostPetQueryParamsSchemaValidation = Joi.object({
    located: Joi.bool(),
    length: Joi.number().min(1).default(5),
    page: Joi.number().min(1).default(1),
    currentLocation: Joi.string().regex(/^.+,.+$/),
    maxDistance: Joi.number().min(5000).default(10000),
    minDistance: Joi.number().min(1).default(1)
});

module.exports = {
    CreateLostPetSchemaValidation,
    PutLostPetSchemaValidation,
    PatchLostPetSchemaValidation,
    GetLostPetSchemaValidation,
    PetLostPetSchemaValidation,
    LostPetQueryParamsSchemaValidation,
}