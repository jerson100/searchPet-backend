const {Router} = require("express");
const DepartamentController = require("../controllers/departament.controller");
const {validateRequest} = require("../middlewares/validateRequest");

const DepartamentRouter = Router();

DepartamentRouter.route("/")
    .get(validateRequest(DepartamentController.getAllDepartaments()))
    .post(validateRequest(DepartamentController.createDepartament()))

module.exports = DepartamentRouter