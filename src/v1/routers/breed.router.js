const Router = require("express").Router();
const BreedController  = require("../../controllers/breed.controller");
const {validateRequest} = require("../../middlewares/validateRequest");
const {validateSchema} = require("../../middlewares/validateSchema");
const {GetBreedSchemaValidation, CreateBreedSchemaValidation, UpdateBreedSchemaValidation, PatchBreedSchemaValidation} = require("../../models/Breed/breed.validation");
const {authenticate} = require("../../middlewares/authenticate");
const {authorizeTypeUser} = require("../../middlewares/authorize");
const {User: UserC} = require("../../utils/consts");

Router.route("/")
    .get(
        validateRequest(BreedController.getAll)
    )
    .post(
        authenticate(),
        authorizeTypeUser([UserC.TYPES.ADMIN]),
        validateSchema(CreateBreedSchemaValidation),
        validateRequest(BreedController.create)
    )
    .delete(
        authenticate(),
        authorizeTypeUser([UserC.TYPES.ADMIN]),
        validateRequest(BreedController.deleteAll)
    )

Router.route("/:idBreed")
    .get(
        validateSchema(GetBreedSchemaValidation,"params"),
        validateRequest(BreedController.findById)
    )
    .put(
        authenticate(),
        authorizeTypeUser([UserC.TYPES.ADMIN]),
        validateSchema(GetBreedSchemaValidation, "params"),
        validateSchema(UpdateBreedSchemaValidation),
        validateRequest(BreedController.update)
    )
    .patch(
        authenticate(),
        authorizeTypeUser([UserC.TYPES.ADMIN]),
        validateSchema(GetBreedSchemaValidation, "params"),
        validateSchema(PatchBreedSchemaValidation),
        validateRequest(BreedController.update)
    )
    .delete(
        authenticate(),
        authorizeTypeUser([UserC.TYPES.ADMIN]),
        validateSchema(GetBreedSchemaValidation, "params"),
        validateRequest(BreedController.deleteOne)
    )

module.exports = Router;