const {Router} = require("express");
const {validateSchema} = require("../middlewares/validateSchema");
const {validateRequest} = require("../middlewares/validateRequest");
const AuthController = require("../controllers/auth.controller");
const {LoginSchemaValidation} = require("../models/User/user.validation");
const AuthRouter = Router();

AuthRouter.post("/login",
    validateSchema(LoginSchemaValidation),
    validateRequest(AuthController.login)
)

module.exports = AuthRouter
