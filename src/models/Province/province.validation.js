const Joi = require("joi");

const obj = {
    name: Joi.string().min(2).max(40).required(),
    idDepartament: Joi.string().regex(/^[a-fA-F\d]{24}$/).required()
}

const ProvinceCreationSchemaValidation = Joi.object(obj);
const ProvinceUpdateSchemaValidation = Joi.object(obj);
const PatchProvinceUpdateSchemaValidation = Joi.object({
    name: Joi.string().min(2).max(40),
    status: Joi.number(),
    idDepartament: Joi.string().regex(/^[a-fA-F\d]{24}$/)
});

const ProvinceGetSchemaValidation = Joi.object({
    idProvince: Joi.string().regex(/^[a-fA-F\d]{24}$/).required()
})

module.exports = {
    ProvinceCreationSchemaValidation,
    ProvinceUpdateSchemaValidation,
    PatchProvinceUpdateSchemaValidation,
    ProvinceGetSchemaValidation
}