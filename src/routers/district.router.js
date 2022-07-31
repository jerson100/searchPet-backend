const {Router} = require("express");
const DisctrictController = require("../controllers/district.controller");
const {validateRequest} = require("../middlewares/validateRequest");
const {validateSchema} = require("../middlewares/validateSchema");
const {DistrictGetSchemaValidation, DistrictUpdateSchemaValidation, PatchDistrictUpdateSchemaValidation} = require("../models/District/district,validation");
const DisctrictRouter = Router();

DisctrictRouter.route("/")
    .get(validateRequest(DisctrictController.getAllDistricts))
    .post(validateRequest(DisctrictController.createDistrict))
    .delete(validateRequest(DisctrictController.deleteAllDistricts))

DisctrictRouter.route("/:idDistrict")
    .get(
        validateSchema(DistrictGetSchemaValidation, "params"),
        validateRequest(DisctrictController.findDistrictById)
    )
    .put(
        validateSchema(DistrictGetSchemaValidation, "params"),
        validateSchema(DistrictUpdateSchemaValidation),
        validateRequest(DisctrictController.updateDistrict)
    )
    .patch(
        validateSchema(DistrictGetSchemaValidation, "params"),
        validateSchema(PatchDistrictUpdateSchemaValidation),
        validateRequest(DisctrictController.updateDistrict)
    )
    .delete(validateRequest(DisctrictController.deleteDistrict))

module.exports = DisctrictRouter;

