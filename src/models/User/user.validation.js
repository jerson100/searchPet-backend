const Joi = require("joi").extend(require("@joi/date"))

const obj = {
    name: Joi.string().min(2).max(30).required(),
    paternalSurname: Joi.string().min(2).max(30).required(),
    maternalSurname: Joi.string().min(2).max(30).required(),
    birthday: Joi.date().format("DD/MM/YYYY"),
    username: Joi.string().regex(/[a-z\d]+/).required(),
    email: Joi.string().email().required(),
    address: Joi.string().min(2).max(100),
    location: Joi.object({
        latitud: Joi.number().required(),
        longitud: Joi.number().required()
    }).required(),
    //Mínimo 10 y máximo 20 caracteres, al menos una letra mayúscula,
    //una letra minúscula, un número y un carácter especial:
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,20}$/).required(),
    district: Joi.string().regex(/^[a-fA-F\d]{24}$/),
    socialNetWorks: Joi.object({
        facebook: Joi.string(),
        twitter: Joi.string(),
        instagram: Joi.string(),
        whatsapp: Joi.string()
    }),
    urlImageProfile: Joi.string()
}

const UserCreationSchemaValidation = Joi.object(obj);

const UserUpdateSchemaValidation = Joi.object(obj);

const PatchUserUpdateSchemaValidation = Joi.object({
    name: Joi.string().min(2).max(30),
    paternalSurname: Joi.string().min(2).max(30),
    maternalSurname: Joi.string().min(2).max(30),
    birthday: Joi.date().format("DD/MM/YYYY"),
    username: Joi.string().regex(/[a-z\d]+/),
    email: Joi.string().email(),
    address: Joi.string().min(2).max(100),
    location: Joi.object({
        latitud: Joi.number(),
        longitud: Joi.number()
    }),
    //Mínimo 10 y máximo 20 caracteres, al menos una letra mayúscula,
    //una letra minúscula, un número y un carácter especial:
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,20}$/),
    district: Joi.string().regex(/^[a-fA-F\d]{24}$/),
    socialNetWorks: Joi.object({
        facebook: Joi.string(),
        twitter: Joi.string(),
        instagram: Joi.string(),
        whatsapp: Joi.string()
    }),
    urlImageProfile: Joi.string()
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