const Joi = require("joi").extend(require("@joi/date"))

const UserCreationSchemaValidation = Joi.object({
    name: Joi.string().min(2).max(30).required().trim().lowercase(),
    paternalSurname: Joi.string().min(2).max(30).required().trim().lowercase(),
    maternalSurname: Joi.string().min(2).max(30).required().trim().lowercase(),
    birthday: Joi.date().format("DD/MM/YYYY"),
    username: Joi.string().regex(/^[a-z\d]+$/i).required().lowercase(),
    email: Joi.string().email().required().lowercase(),
    address: Joi.string().min(2).max(100).empty("").trim(),
    location: Joi.object({
        latitud: Joi.number().required(),
        longitud: Joi.number().required()
    }).required(),
    //Mínimo 10 y máximo 20 caracteres, al menos una letra mayúscula,
    //una letra minúscula, un número y un carácter especial:
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,20}$/).required(),
    cPassword: Joi.string().equal(Joi.ref("password")).required(),
    district: Joi.string().regex(/^[a-fA-F\d]{24}$/),
    socialNetWorks: Joi.object({
        facebook: Joi.string().empty(""),
        twitter: Joi.string().empty(""),
        instagram: Joi.string().empty(""),
        whatsapp: Joi.string().empty("")
    })
});

const UserUpdateSchemaValidation = Joi.object({
    name: Joi.string().min(2).max(30).required().trim().lowercase(),
    paternalSurname: Joi.string().min(2).max(30).required().trim().lowercase(),
    maternalSurname: Joi.string().min(2).max(30).required().trim().lowercase(),
    birthday: Joi.date().format("DD/MM/YYYY"),
    username: Joi.string().regex(/^[a-z\d]+$/i).required().lowercase(),
    email: Joi.string().email().required().lowercase(),
    address: Joi.string().min(2).max(100).allow("").trim(),
    location: Joi.object({
        latitud: Joi.number().required(),
        longitud: Joi.number().required()
    }).required(),
    //Mínimo 10 y máximo 20 caracteres, al menos una letra mayúscula,
    //una letra minúscula, un número y un carácter especial:
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,20}$/).required(),
    district: Joi.string().regex(/^[a-fA-F\d]{24}$/),
    socialNetWorks: Joi.object({
        facebook: Joi.string().allow(""),
        twitter: Joi.string().allow(""),
        instagram: Joi.string().allow(""),
        whatsapp: Joi.string().allow("")
    })
});

const PatchUserUpdateSchemaValidation = Joi.object({
    name: Joi.string().min(2).max(30).trim().lowercase(),
    paternalSurname: Joi.string().min(2).max(30).trim().lowercase(),
    maternalSurname: Joi.string().min(2).max(30).trim().lowercase(),
    birthday: Joi.date().format("DD/MM/YYYY").allow(""),
    username: Joi.string().regex(/[a-z\d]+/).lowercase(),
    email: Joi.string().email().lowercase(),
    address: Joi.string().min(2).max(100).trim().allow(""),
    location: Joi.object({
        latitud: Joi.number(),
        longitud: Joi.number()
    }),
    //Mínimo 10 y máximo 20 caracteres, al menos una letra mayúscula,
    //una letra minúscula, un número y un carácter especial:
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,20}$/),
    district: Joi.string().regex(/^[a-fA-F\d]{24}$/),
    socialNetWorks: Joi.object({
        facebook: Joi.string().allow(""),
        twitter: Joi.string().allow(""),
        instagram: Joi.string().allow(""),
        whatsapp: Joi.string().allow("")
    }),
});

const LoginSchemaValidation = Joi.object({
    email: Joi.string().regex(/[a-z\d]+/).required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,20}$/).required()
});

const UserGetSchemaValidation = Joi.object({
   idUser: Joi.string().regex(/^[a-fA-F\d]{24}$/).required()
});

module.exports = {
    UserCreationSchemaValidation,
    UserUpdateSchemaValidation,
    PatchUserUpdateSchemaValidation,
    UserGetSchemaValidation,
    LoginSchemaValidation
}