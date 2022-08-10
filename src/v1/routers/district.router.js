const {Router} = require("express");
const DisctrictController = require("../../controllers/district.controller");
const {validateRequest} = require("../../middlewares/validateRequest");
const {validateSchema} = require("../../middlewares/validateSchema");
const {DistrictGetSchemaValidation, DistrictUpdateSchemaValidation, PatchDistrictUpdateSchemaValidation,
    DistrictCreationSchemaValidation
} = require("../../models/District/district,validation");
const {authenticate} = require("../../middlewares/authenticate");
const {User} = require("../../utils/consts");
const DisctrictRouter = Router();

DisctrictRouter.route("/")
    .get(
        validateRequest(DisctrictController.getAllDistricts)
    )
    .post(
        authenticate(User.TYPES.ADMIN),
        validateSchema(DistrictCreationSchemaValidation),
        validateRequest(DisctrictController.createDistrict)
    )
    .delete(
        authenticate(User.TYPES.ADMIN),
        validateRequest(DisctrictController.deleteAllDistricts)
    )

DisctrictRouter.route("/:idDistrict")
    .get(
        validateSchema(DistrictGetSchemaValidation, "params"),
        validateRequest(DisctrictController.getOneDistrictById)
    )
    .put(
        authenticate(User.TYPES.ADMIN),
        validateSchema(DistrictGetSchemaValidation, "params"),
        validateSchema(DistrictUpdateSchemaValidation),
        validateRequest(DisctrictController.updateDistrict)
    )
    .patch(
        authenticate(User.TYPES.ADMIN),
        validateSchema(DistrictGetSchemaValidation, "params"),
        validateSchema(PatchDistrictUpdateSchemaValidation),
        validateRequest(DisctrictController.updateDistrict)
    )
    .delete(
        authenticate(User.TYPES.ADMIN),
        validateRequest(DisctrictController.deleteDistrict)
    )

module.exports = DisctrictRouter;

