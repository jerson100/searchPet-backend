const {Router} = require("express");
const {validateRequest} = require("../middlewares/validateRequest");
const UserController = require("../controllers/user.controller");
const UserRouter = Router();

UserRouter.route("/")
    .get(validateRequest(UserController.getAllUsers))
    .post(validateRequest(UserController.createUser))

module.exports = UserRouter;

