const {Router} = require("express");
const {validateSchema} = require("../../middlewares/validateSchema");
const {validateRequest} = require("../../middlewares/validateRequest");
const AuthController = require("../../controllers/auth.controller");
const {LoginSchemaValidation, LoginGoogleSchemaValidation} = require("../../models/User/user.validation");
const {authenticate} = require("../../middlewares/authenticate");
const AuthRouter = Router();

AuthRouter.post("/login",
    validateSchema(LoginSchemaValidation),
    validateRequest(AuthController.login)
)

AuthRouter.post("/login/google",
    validateSchema(LoginGoogleSchemaValidation,"query"),
    validateRequest(AuthController.googleLogin))

AuthRouter.get("/token",
    authenticate(null,400),
    validateRequest(AuthController.getToken)
)

module.exports = AuthRouter
