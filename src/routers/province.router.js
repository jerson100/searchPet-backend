const {Router} = require("express");
const ProvinceController = require("../controllers/province.controller");
const {validateRequest} = require("../middlewares/validateRequest");
const {ProvinceGetSchemaValidation, ProvinceUpdateSchemaValidation, PatchProvinceUpdateSchemaValidation,
    ProvinceCreationSchemaValidation
} = require("../models/Province/province.validation");
const {validateSchema} = require("../middlewares/validateSchema");
const ProvinceRouter = Router();

ProvinceRouter.route("/")
    .get(validateRequest(ProvinceController.getAllProvinces))
    .post(
        validateSchema(ProvinceCreationSchemaValidation),
        validateRequest(ProvinceController.createProvince)
    )

ProvinceRouter.route("/:idProvince")
    .get(
        validateSchema(ProvinceGetSchemaValidation),
        validateRequest(ProvinceController.findProvinceById)
    )
    .put(
        validateSchema(ProvinceGetSchemaValidation, "params"),
        validateSchema(ProvinceUpdateSchemaValidation),
        validateRequest(ProvinceController.updateProvince)
    )
    .patch(
        validateSchema(ProvinceGetSchemaValidation, "params"),
        validateSchema(PatchProvinceUpdateSchemaValidation),
        validateRequest(ProvinceController.updateProvince)
    )
    .delete(
        validateSchema(ProvinceGetSchemaValidation, "params"),
        validateRequest(ProvinceController.deleteProvince)
    )

module.exports = ProvinceRouter