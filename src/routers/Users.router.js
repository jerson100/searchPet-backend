const {Router} = require("express");
const {validateRequest} = require("../middlewares/validateRequest");
const {validateSchema} = require("../middlewares/validateSchema");
const UserController = require("../controllers/user.controller");
const {UserCreationSchemaValidation, UserUpdateSchemaValidation, PatchUserUpdateSchemaValidation,
    UserGetSchemaValidation
} = require("../models/User/user.validation");
const UserRouter = Router();

UserRouter.route("/")
    .get(validateRequest(UserController.getAllUsers))
    .post(
        validateSchema(UserCreationSchemaValidation),
        validateRequest(UserController.createUser)
    )
    .delete(validateRequest(UserController.deleteAllUser))

/*
* Solo el administrador va a poder eliminar a cualquier tipo de usuario
* por ende a este punto final nadie más va a tener acceso.
* aún no está implementado...
* */
UserRouter.route("/:idUser")
    .get(
        validateSchema(UserGetSchemaValidation,"params"),
        validateRequest(UserController.findUserById)
    )
    .put(
        validateSchema(UserGetSchemaValidation,"params"),
        validateSchema(UserUpdateSchemaValidation),
        validateRequest(UserController.updateUser)
    )
    .patch(
        validateSchema(UserGetSchemaValidation,"params"),
        validateSchema(PatchUserUpdateSchemaValidation),
        validateRequest(UserController.updateUser)
    )
    .delete(validateRequest(UserController.deleteUser))

module.exports = UserRouter;

