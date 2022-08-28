const {Router} = require("express");
const ProvinceController = require("../../controllers/province.controller");
const {validateRequest} = require("../../middlewares/validateRequest");
const {ProvinceGetSchemaValidation, ProvinceUpdateSchemaValidation, PatchProvinceUpdateSchemaValidation,
    ProvinceCreationSchemaValidation
} = require("../../models/Province/province.validation");
const {validateSchema} = require("../../middlewares/validateSchema");
const {authenticate} = require("../../middlewares/authenticate");
const {User} = require("../../utils/consts");
const {authorizeTypeUser} = require("../../middlewares/authorize");
const ProvinceRouter = Router();

ProvinceRouter.route("/")
    .get(validateRequest(ProvinceController.getAllProvinces))
    .post(
        authenticate(),
        authorizeTypeUser(User.TYPES.ADMIN),
        validateSchema(ProvinceCreationSchemaValidation),
        validateRequest(ProvinceController.createProvince)
    )

ProvinceRouter.route("/:idProvince")
    .get(
        validateSchema(ProvinceGetSchemaValidation, "params"),
        validateRequest(ProvinceController.findProvinceById)
    )
    .put(
        validateSchema(ProvinceGetSchemaValidation, "params"),
        authenticate(),
        authorizeTypeUser(User.TYPES.ADMIN),
        validateSchema(ProvinceUpdateSchemaValidation),
        validateRequest(ProvinceController.updateProvince)
    )
    .patch(
        validateSchema(ProvinceGetSchemaValidation, "params"),
        authenticate(),
        authorizeTypeUser(User.TYPES.ADMIN),
        validateSchema(PatchProvinceUpdateSchemaValidation),
        validateRequest(ProvinceController.updateProvince)
    )
    .delete(
        validateSchema(ProvinceGetSchemaValidation, "params"),
        authenticate(),
        authorizeTypeUser(User.TYPES.ADMIN),
        validateRequest(ProvinceController.deleteProvince)
    )

module.exports = ProvinceRouter