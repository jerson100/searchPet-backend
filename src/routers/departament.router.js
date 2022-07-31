const {Router} = require("express");
const DepartamentController = require("../controllers/departament.controller");
const {validateRequest} = require("../middlewares/validateRequest");
const {validateSchema} = require("../middlewares/validateSchema");
const {DepartamentGetSchemaValidation, DepartamentUpdateSchemaValidation, PatchDepartamentUpdateSchemaValidation} = require("../models/Departament/departament.validation");

const DepartamentRouter = Router();

DepartamentRouter.route("/")
    .get(validateRequest(DepartamentController.getAllDepartaments))
    .post(validateRequest(DepartamentController.createDepartament))
    .delete(validateRequest(DepartamentController.deleteAllDepartaments))

DepartamentRouter.route("/:idDepartament")
    .get(
        validateSchema(DepartamentGetSchemaValidation, "params"),
        validateRequest(DepartamentController.findDepartamentById)
    )
    .put(
        validateSchema(DepartamentGetSchemaValidation, "params"),
        validateSchema(DepartamentUpdateSchemaValidation),
        validateRequest(DepartamentController.updateDepartament)
    )
    .patch(
        validateSchema(DepartamentGetSchemaValidation, "params"),
        validateSchema(PatchDepartamentUpdateSchemaValidation),
        validateRequest(DepartamentController.updateDepartament)
    )
    .delete(validateRequest(DepartamentController.deleteDepartament))

module.exports = DepartamentRouter