const Joi = require("joi").extend(require("@joi/date"))

const UserCreationSchemaValidation = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    paternalSurname: Joi.string().min(2).max(30).required(),
    maternalSurname: Joi.string().min(2).max(30).required(),
    birthday: Joi.date().format("DD/MM/YYYY"),
    username: Joi.string().regex(/[a-z\d]+/).required(),
    //Mínimo 10 y máximo 20 caracteres, al menos una letra mayúscula,
    //una letra minúscula, un número y un carácter especial:
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,20}$/).required(),
    idDistrict: Joi.string().regex(/^[a-fA-F\d]{24}$/).required()
})

module.exports = {
    UserCreationSchemaValidation
}