const {Router} = require("express");
const {validateRequest} = require("../middlewares/validateRequest");
const {validateSchema} = require("../middlewares/validateSchema");
const UserController = require("../controllers/user.controller");
const {UserCreationSchemaValidation, UserUpdateSchemaValidation, PatchUserUpdateSchemaValidation,
    UserGetSchemaValidation
} = require("../models/User/user.validation");
const {verifyAccessToken} = require("../middlewares/verifyAccessToken");
const {User} = require("../utils/consts");
const {accessUserCrud} = require("../middlewares/accessUserCrud");
const UserRouter = Router();

UserRouter.route("/")
    .get(
        verifyAccessToken(User.TYPES.ADMIN),
        validateRequest(UserController.getAllUsers)
    )
    .post(
        validateSchema(UserCreationSchemaValidation),
        validateRequest(UserController.createUser)
    )
    .delete(
        verifyAccessToken(User.TYPES.ADMIN),
        validateRequest(UserController.deleteAllUser)
    )

UserRouter.route("/:idUser")
    .get(
        validateSchema(UserGetSchemaValidation,"params"),
        validateRequest(UserController.findUserById)
    )
    .put(
        validateSchema(UserGetSchemaValidation,"params"),
        verifyAccessToken(),
        accessUserCrud([User.TYPES.ADMIN]),
        validateSchema(UserUpdateSchemaValidation),
        validateRequest(UserController.updateUser)
    )
    .patch(
        validateSchema(UserGetSchemaValidation,"params"),
        verifyAccessToken(),
        accessUserCrud([User.TYPES.ADMIN]),
        validateSchema(PatchUserUpdateSchemaValidation),
        validateRequest(UserController.updateUser)
    )
    .delete(
        validateSchema(UserGetSchemaValidation,"params"),
        verifyAccessToken(),
        accessUserCrud([User.TYPES.ADMIN]),
        validateRequest(UserController.deleteUser)
    )

module.exports = UserRouter;

