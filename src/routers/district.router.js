const {Router} = require("express");
const DisctrictController = require("../controllers/district.controller");
const {validateRequest} = require("../middlewares/validateRequest");
const {validateSchema} = require("../middlewares/validateSchema");
const {DistrictGetSchemaValidation, DistrictUpdateSchemaValidation, PatchDistrictUpdateSchemaValidation} = require("../models/District/district,validation");
const {verifyAccessToken} = require("../middlewares/verifyAccessToken");
const {User} = require("../utils/consts");
const DisctrictRouter = Router();

DisctrictRouter.route("/")
    .get(
        validateRequest(DisctrictController.getAllDistricts)
    )
    .post(
        verifyAccessToken(User.TYPES.ADMIN),
        validateRequest(DisctrictController.createDistrict)
    )
    .delete(
        verifyAccessToken(User.TYPES.ADMIN),
        validateRequest(DisctrictController.deleteAllDistricts)
    )

DisctrictRouter.route("/:idDistrict")
    .get(
        validateSchema(DistrictGetSchemaValidation, "params"),
        validateRequest(DisctrictController.findDistrictById)
    )
    .put(
        verifyAccessToken(User.TYPES.ADMIN),
        validateSchema(DistrictGetSchemaValidation, "params"),
        validateSchema(DistrictUpdateSchemaValidation),
        validateRequest(DisctrictController.updateDistrict)
    )
    .patch(
        verifyAccessToken(User.TYPES.ADMIN),
        validateSchema(DistrictGetSchemaValidation, "params"),
        validateSchema(PatchDistrictUpdateSchemaValidation),
        validateRequest(DisctrictController.updateDistrict)
    )
    .delete(
        verifyAccessToken(User.TYPES.ADMIN),
        validateRequest(DisctrictController.deleteDistrict)
    )

module.exports = DisctrictRouter;

