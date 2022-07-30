const {Router} = require("express");
const ProvinceController = require("../controllers/province.controller");
const {validateRequest} = require("../middlewares/validateRequest");
const ProvinceRouter = Router();

ProvinceRouter.route("/")
    .get(validateRequest(ProvinceController.getAllProvinces()))
    .post(validateRequest(ProvinceController.createProvince()))

module.exports = ProvinceRouter