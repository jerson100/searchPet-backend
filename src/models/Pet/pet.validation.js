const JoiDate = require("@joi/date");
const Joi = require("joi").extend(JoiDate);

const CreatePetSchemaValidation = Joi.object({
    name: Joi.string().min(2).max(40).required(),
    breed: Joi.string().regex(/^[a-fA-F\d]{24}$/),
    dateOfBirth: Joi.date().format("DD/MM/YYYY"),
    characteristics: Joi.object({
        size: Joi.string().valid("Pequeño","Mediano","Grande"),
        eyeColor: Joi.string(),
        hairColor: Joi.string()
    }),
});

const PutPetSchemaValidation = Joi.object({
    name: Joi.string().min(2).max(40).required(),
    breed: Joi.string().regex(/^[a-fA-F\d]{24}$/).required(),
    urlImageProfile: Joi.string().required(),
    dateOfBirth: Joi.date().format("DD/MM/YYYY").required(),
    characteristics: Joi.object({
        size: Joi.string().valid("Pequeño","Mediano","Grande"),
        eyeColor: Joi.string(),
        hairColor: Joi.string()
    }).required(),
});

const PatchPetSchemaValidation = Joi.object({
    name: Joi.string().min(2).max(40),
    breed: Joi.string().regex(/^[a-fA-F\d]{24}$/),
    dateOfBirth: Joi.date().format("DD/MM/YYYY"),
    characteristics: Joi.object({
        size: Joi.string().valid("Pequeño","Mediano","Grande"),
        eyeColor: Joi.string(),
        hairColor: Joi.string()
    }),
});

const GetPetSchemaValidation = Joi.object({
    idPet: Joi.string().regex(/^[a-fA-F\d]{24}$/)
});

module.exports = {
    CreatePetSchemaValidation,
    PutPetSchemaValidation,
    PatchPetSchemaValidation,
    GetPetSchemaValidation
}
