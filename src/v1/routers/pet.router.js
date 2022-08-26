const PetController = require("../../controllers/pet.controller");
const {validateSchema} = require("../../middlewares/validateSchema");
const {validateRequest} = require("../../middlewares/validateRequest");
const {authenticate} = require("../../middlewares/authenticate");
const {authorizeTypeUser, authorizeMyResource} = require("../../middlewares/authorize");
const {User : UserC} = require("../../utils/consts");
const {CreatePetSchemaValidation, GetPetSchemaValidation, PutPetSchemaValidation, PatchPetSchemaValidation} = require("../../models/Pet/pet.validation");
const {Pet} = require("../../models/Pet/pet.model");
const Router = require("express").Router();

Router.route("/")
    .get(
        authenticate(),
        validateRequest(PetController.getAll)
    )
    .post(
        authenticate(),
        authorizeTypeUser([UserC.TYPES.ADMIN, UserC.TYPES.USER]),
        validateSchema(CreatePetSchemaValidation),
        validateRequest(PetController.create)
    )
    .delete(
        authenticate(),
        authorizeTypeUser([UserC.TYPES.ADMIN]),
        validateRequest(PetController.deleteAll)
    )

Router.route("/:idPet")
    .get(
        validateSchema(GetPetSchemaValidation, "params"),
        validateRequest(PetController.findById)
    )
    .put(
        authenticate(),
        validateSchema(GetPetSchemaValidation,"params"),
        authorizeMyResource(Pet, "idPet", [UserC.TYPES.ADMIN], "user"),
        validateSchema(PutPetSchemaValidation),
        validateRequest(PetController.update)
    )
    .patch(
        authenticate(),
        validateSchema(GetPetSchemaValidation, "params"),
        authorizeMyResource(Pet, "idPet", [UserC.TYPES.ADMIN], "user"),
        validateSchema(PatchPetSchemaValidation),
        validateRequest(PetController.update)
    )
    .delete(
        authenticate(),
        validateSchema(GetPetSchemaValidation, "params"),
        authorizeMyResource(Pet, "idPet", [UserC.TYPES.ADMIN], "user"),
        validateRequest(PetController.deleteOne)
    )

module.exports = Router;