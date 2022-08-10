const {Router} = require("express");
const DepartamentController = require("../../controllers/departament.controller");
const {validateRequest} = require("../../middlewares/validateRequest");
const {validateSchema} = require("../../middlewares/validateSchema");
const {DepartamentGetSchemaValidation, DepartamentUpdateSchemaValidation, PatchDepartamentUpdateSchemaValidation} = require("../../models/Departament/departament.validation");
const {authenticate} = require("../../middlewares/authenticate");
const {User} = require("../../utils/consts");

const DepartamentRouter = Router();

DepartamentRouter.route("/")
    .get(validateRequest(DepartamentController.getAllDepartaments))
    .post(
        authenticate(User.TYPES.ADMIN),
        validateRequest(DepartamentController.createDepartament)
    )
    .delete(
        authenticate(User.TYPES.ADMIN),
        validateRequest(DepartamentController.deleteAllDepartaments)
    )

DepartamentRouter.route("/:idDepartament")
    .get(
        validateSchema(DepartamentGetSchemaValidation, "params"),
        validateRequest(DepartamentController.findDepartamentById)
    )
    .put(
        authenticate(User.TYPES.ADMIN),
        validateSchema(DepartamentGetSchemaValidation, "params"),
        validateSchema(DepartamentUpdateSchemaValidation),
        validateRequest(DepartamentController.updateDepartament)
    )
    .patch(
        authenticate(User.TYPES.ADMIN),
        validateSchema(DepartamentGetSchemaValidation, "params"),
        validateSchema(PatchDepartamentUpdateSchemaValidation),
        validateRequest(DepartamentController.updateDepartament)
    )
    .delete(
        authenticate(User.TYPES.ADMIN),
        validateRequest(DepartamentController.deleteDepartament)
    )

module.exports = DepartamentRouter