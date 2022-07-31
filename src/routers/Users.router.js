const {Router} = require("express");
const {validateRequest} = require("../middlewares/validateRequest");
const {validateSchema} = require("../middlewares/validateSchema");
const UserController = require("../controllers/user.controller");
const {UserCreationSchemaValidation} = require("../models/User/user.validation");
const UserRouter = Router();

UserRouter.route("/")
    .get(validateRequest(UserController.getAllUsers))
    .post(
        validateSchema(UserCreationSchemaValidation),
        validateRequest(UserController.createUser)
    )
    .delete(validateRequest(UserController.deleteUser))

/*
* Solo el administrador va a poder eliminar a cualquier tipo de usuario
* por ende a este punto final nadie más va a tener acceso.
* aún no está implementado...
* */
UserRouter.route("/:idUser")
    .delete(validateRequest(UserController.deleteUser))

module.exports = UserRouter;

