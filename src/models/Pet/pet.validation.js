const JoiDate = require("@joi/date");
const Joi = require("joi").extend(JoiDate);

const CreatePetSchemaValidation = Joi.object({
    name: Joi.string().min(2).max(40).required(),
    breed: Joi.string().regex(/^[a-fA-F\d]{24}$/).required(),
    dateOfBirth: Joi.date().format("DD/MM/YYYY"),
    description: Joi.string().max(400).empty(""),
    characteristics: Joi.object({
        size: Joi.string().valid("Pequeño","Mediano","Grande"),
        eyeColor: Joi.string().regex(/[a-z ]{2,40}/i).empty("").trim(),
        hairColor: Joi.string().regex(/[a-z ]{2,40}/i).empty("").trim(),
    }),
});

const PutPetSchemaValidation = Joi.object({
    name: Joi.string().min(2).max(40).required(),
    breed: Joi.string().regex(/^[a-fA-F\d]{24}$/).required(),
    urlImageProfile: Joi.string().required(),
    dateOfBirth: Joi.date().format("DD/MM/YYYY").required(),
    description: Joi.string().max(400).allow(""),
    characteristics: Joi.object({
        size: Joi.string().valid("Pequeño","Mediano","Grande"),
        eyeColor: Joi.string().regex(/[a-z ]{2,40}/i).allow("").trim(),
        hairColor: Joi.string().regex(/[a-z ]{2,40}/i).allow("").trim(),
    }).required(),
});

const PatchPetSchemaValidation = Joi.object({
    name: Joi.string().min(2).max(40),
    breed: Joi.string().regex(/^[a-fA-F\d]{24}$/),
    dateOfBirth: Joi.date().format("DD/MM/YYYY"),
    description: Joi.string().max(400).allow(""),
    characteristics: Joi.object({
        size: Joi.string().valid("Pequeño","Mediano","Grande"),
        eyeColor: Joi.string().regex(/[a-z ]{2,40}/i).allow("").trim(),
        hairColor: Joi.string().regex(/[a-z ]{2,40}/i).allow("").trim(),
    }),
});

const ImagesDeleteSchemaValidation = Joi.object({
    images: Joi.array().items(Joi.string()).required()
})

const GetPetSchemaValidation = Joi.object({
    idPet: Joi.string().regex(/^[a-fA-F\d]{24}$/)
});

module.exports = {
    CreatePetSchemaValidation,
    PutPetSchemaValidation,
    PatchPetSchemaValidation,
    GetPetSchemaValidation,
    ImagesDeleteSchemaValidation
}
