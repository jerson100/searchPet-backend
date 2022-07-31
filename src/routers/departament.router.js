const {Router} = require("express");
const DepartamentController = require("../controllers/departament.controller");
const {validateRequest} = require("../middlewares/validateRequest");

const DepartamentRouter = Router();

DepartamentRouter.route("/")
    .get(validateRequest(DepartamentController.getAllDepartaments))
    .post(validateRequest(DepartamentController.createDepartament))

DepartamentRouter.route("/:idDepartament")
    .delete(validateRequest(DepartamentController.deleteDepartament))

module.exports = DepartamentRouter