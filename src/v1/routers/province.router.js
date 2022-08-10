const {Router} = require("express");
const ProvinceController = require("../../controllers/province.controller");
const {validateRequest} = require("../../middlewares/validateRequest");
const {ProvinceGetSchemaValidation, ProvinceUpdateSchemaValidation, PatchProvinceUpdateSchemaValidation,
    ProvinceCreationSchemaValidation
} = require("../../models/Province/province.validation");
const {validateSchema} = require("../../middlewares/validateSchema");
const {authenticate} = require("../../middlewares/authenticate");
const {User} = require("../../utils/consts");
const ProvinceRouter = Router();

ProvinceRouter.route("/")
    .get(validateRequest(ProvinceController.getAllProvinces))
    .post(
        authenticate(User.TYPES.ADMIN),
        validateSchema(ProvinceCreationSchemaValidation),
        validateRequest(ProvinceController.createProvince)
    )

ProvinceRouter.route("/:idProvince")
    .get(
        validateSchema(ProvinceGetSchemaValidation, "params"),
        validateRequest(ProvinceController.findProvinceById)
    )
    .put(
        authenticate(User.TYPES.ADMIN),
        validateSchema(ProvinceGetSchemaValidation, "params"),
        validateSchema(ProvinceUpdateSchemaValidation),
        validateRequest(ProvinceController.updateProvince)
    )
    .patch(
        authenticate(User.TYPES.ADMIN),
        validateSchema(ProvinceGetSchemaValidation, "params"),
        validateSchema(PatchProvinceUpdateSchemaValidation),
        validateRequest(ProvinceController.updateProvince)
    )
    .delete(
        authenticate(User.TYPES.ADMIN),
        validateSchema(ProvinceGetSchemaValidation, "params"),
        validateRequest(ProvinceController.deleteProvince)
    )

module.exports = ProvinceRouter