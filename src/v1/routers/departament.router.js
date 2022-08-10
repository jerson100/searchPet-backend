const {Router} = require("express");
const DepartamentController = require("../../controllers/departament.controller");
const {validateRequest} = require("../../middlewares/validateRequest");
const {validateSchema} = require("../../middlewares/validateSchema");
const {DepartamentGetSchemaValidation, DepartamentUpdateSchemaValidation, PatchDepartamentUpdateSchemaValidation} = require("../../models/Departament/departament.validation");
const {verifyAccessToken} = require("../../middlewares/verifyAccessToken");
const {User} = require("../../utils/consts");

const DepartamentRouter = Router();

DepartamentRouter.route("/")
    .get(validateRequest(DepartamentController.getAllDepartaments))
    .post(
        verifyAccessToken(User.TYPES.ADMIN),
        validateRequest(DepartamentController.createDepartament)
    )
    .delete(
        verifyAccessToken(User.TYPES.ADMIN),
        validateRequest(DepartamentController.deleteAllDepartaments)
    )

DepartamentRouter.route("/:idDepartament")
    .get(
        validateSchema(DepartamentGetSchemaValidation, "params"),
        validateRequest(DepartamentController.findDepartamentById)
    )
    .put(
        verifyAccessToken(User.TYPES.ADMIN),
        validateSchema(DepartamentGetSchemaValidation, "params"),
        validateSchema(DepartamentUpdateSchemaValidation),
        validateRequest(DepartamentController.updateDepartament)
    )
    .patch(
        verifyAccessToken(User.TYPES.ADMIN),
        validateSchema(DepartamentGetSchemaValidation, "params"),
        validateSchema(PatchDepartamentUpdateSchemaValidation),
        validateRequest(DepartamentController.updateDepartament)
    )
    .delete(
        verifyAccessToken(User.TYPES.ADMIN),
        validateRequest(DepartamentController.deleteDepartament)
    )

module.exports = DepartamentRouter