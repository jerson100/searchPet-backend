const {Router} = require("express");
const {validateRequest} = require("../../middlewares/validateRequest");
const {validateSchema} = require("../../middlewares/validateSchema");
const UserController = require("../../controllers/user.controller");
const User = require("../../models/User/user.model");
const {UserCreationSchemaValidation, UserUpdateSchemaValidation, PatchUserUpdateSchemaValidation,
    UserGetSchemaValidation, UserQueryParamsSchemaValidation, UserLostPetsQueryParamsSchemaValidation
} = require("../../models/User/user.validation");
const {authenticate} = require("../../middlewares/authenticate");
const {User: CONSTANTS} = require("../../utils/consts");
const {authorizeTypeUser, authorizeMyResource} = require("../../middlewares/authorize");
const UserRouter = Router();

UserRouter.route("/")
    .get(
        authenticate(),
        authorizeTypeUser([CONSTANTS.TYPES.ADMIN]),
        validateRequest(UserController.getAllUsers)
    )
    .post(
        validateSchema(UserCreationSchemaValidation),
        validateRequest(UserController.createUser)
    )
    .delete(
        authenticate(),
        authorizeTypeUser([CONSTANTS.TYPES.ADMIN]),
        validateRequest(UserController.deleteAllUser)
    )

UserRouter.route("/:idUser")
    .get(
        validateSchema(UserGetSchemaValidation,"params"),
        validateRequest(UserController.findUserById)
    )
    .put(
        validateSchema(UserGetSchemaValidation,"params"),
        authenticate(),
        authorizeMyResource(User,"idUser",[CONSTANTS.TYPES.ADMIN]),
        validateSchema(UserUpdateSchemaValidation),
        validateRequest(UserController.updateUser)
    )
    .patch(
        validateSchema(UserGetSchemaValidation,"params"),
        authenticate(),
        authorizeMyResource(User,"idUser",[CONSTANTS.TYPES.ADMIN]),
        validateSchema(PatchUserUpdateSchemaValidation),
        validateRequest(UserController.updateUser)
    )
    .delete(
        validateSchema(UserGetSchemaValidation,"params"),
        authenticate(),
        authorizeMyResource(User,"idUser",[CONSTANTS.TYPES.ADMIN]),
        validateRequest(UserController.deleteUser)
    )

UserRouter.route("/:idUser/pets")
    .get(
        validateSchema(UserGetSchemaValidation,"params"),
        validateSchema(UserQueryParamsSchemaValidation, "query"),
        validateRequest(UserController.getMyPets)
    )

UserRouter.route("/:idUser/activities")
    .get(
        validateSchema(UserGetSchemaValidation, "params"),
        validateRequest(UserController.getActivities)
    )

UserRouter.route("/:idUser/lostpets")
    .get(
        validateSchema(UserGetSchemaValidation, "params"),
        validateSchema(UserLostPetsQueryParamsSchemaValidation, "query"),
        validateRequest(UserController.getMyLostPet)
    )

module.exports = UserRouter;

