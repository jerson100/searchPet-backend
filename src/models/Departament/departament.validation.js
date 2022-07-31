const Joi = require("joi");

const obj = {
    name: Joi.string().min(2).max(40).required()
}

const DepartamentCreationSchemaValidation = Joi.object(obj);
const DepartamentUpdateSchemaValidation = Joi.object(obj);
const PatchDepartamentUpdateSchemaValidation = Joi.object({
    name: Joi.string().min(2).max(40),
    status: Joi.number()
});

const DepartamentGetSchemaValidation = Joi.object({
    idDepartament: Joi.string().regex(/^[a-fA-F\d]{24}$/).required()
})

module.exports = {
    DepartamentCreationSchemaValidation,
    DepartamentUpdateSchemaValidation,
    PatchDepartamentUpdateSchemaValidation,
    DepartamentGetSchemaValidation
}