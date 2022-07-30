const {Router} = require("express");
const DisctrictController = require("../controllers/district.controller");
const {validateRequest} = require("../middlewares/validateRequest");
const DisctrictRouter = Router();

DisctrictRouter.route("/")
    .get(validateRequest(DisctrictController.getAllDistricts))
    .post(validateRequest(DisctrictController.createDistrict));

module.exports = DisctrictRouter;

