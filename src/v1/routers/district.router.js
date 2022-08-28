const {Router} = require("express");
const DisctrictController = require("../../controllers/district.controller");
const {validateRequest} = require("../../middlewares/validateRequest");
const {validateSchema} = require("../../middlewares/validateSchema");
const {DistrictGetSchemaValidation, DistrictUpdateSchemaValidation, PatchDistrictUpdateSchemaValidation,
    DistrictCreationSchemaValidation
} = require("../../models/District/district,validation");
const {authenticate} = require("../../middlewares/authenticate");
const {User} = require("../../utils/consts");
const {authorizeTypeUser} = require("../../middlewares/authorize");
const DisctrictRouter = Router();

DisctrictRouter.route("/")
    .get(
        validateRequest(DisctrictController.getAllDistricts)
    )
    .post(
        authenticate(),
        authorizeTypeUser([User.TYPES.ADMIN]),
        validateSchema(DistrictCreationSchemaValidation),
        validateRequest(DisctrictController.createDistrict)
    )
    .delete(
        authenticate(),
        authorizeTypeUser([User.TYPES.ADMIN]),
        validateRequest(DisctrictController.deleteAllDistricts)
    )

DisctrictRouter.route("/:idDistrict")
    .get(
        validateSchema(DistrictGetSchemaValidation, "params"),
        validateRequest(DisctrictController.getOneDistrictById)
    )
    .put(
        validateSchema(DistrictGetSchemaValidation, "params"),
        authenticate(),
        authorizeTypeUser([User.TYPES.ADMIN]),
        validateSchema(DistrictUpdateSchemaValidation),
        validateRequest(DisctrictController.updateDistrict)
    )
    .patch(
        validateSchema(DistrictGetSchemaValidation, "params"),
        authenticate(),
        authorizeTypeUser([User.TYPES.ADMIN]),
        validateSchema(PatchDistrictUpdateSchemaValidation),
        validateRequest(DisctrictController.updateDistrict)
    )
    .delete(
        validateSchema(DistrictGetSchemaValidation, "params"),
        authenticate(),
        authorizeTypeUser([User.TYPES.ADMIN]),
        validateRequest(DisctrictController.deleteDistrict)
    )

module.exports = DisctrictRouter;

