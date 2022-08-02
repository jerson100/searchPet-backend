const Joi = require("joi");

const obj = {
    name: Joi.string().min(2).max(40).required(),
    province: Joi.string().regex(/^[a-fA-F\d]{24}$/).required()
}

const DistrictCreationSchemaValidation = Joi.object(obj);
const DistrictUpdateSchemaValidation = Joi.object(obj);
const PatchDistrictUpdateSchemaValidation = Joi.object({
    name: Joi.string().min(2).max(40),
    status: Joi.number(),
    province: Joi.string().regex(/^[a-fA-F\d]{24}$/)
});

const DistrictGetSchemaValidation = Joi.object({
    idDistrict: Joi.string().regex(/^[a-fA-F\d]{24}$/).required()
})

module.exports = {
    DistrictCreationSchemaValidation,
    DistrictUpdateSchemaValidation,
    PatchDistrictUpdateSchemaValidation,
    DistrictGetSchemaValidation
}