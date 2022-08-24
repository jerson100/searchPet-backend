const {validateRequest} = require("../../middlewares/validateRequest");
const TypePetController = require("../../controllers/typePet.controller");
const {validateSchema} = require("../../middlewares/validateSchema");
const {GetTypePetSchemaValidation, PutTypePetSchemaValidation, PatchTypePetSchemaValidation} = require("../../models/TypePet/typePet.validation");
const {authenticate} = require("../../middlewares/authenticate");
const {authorizeTypeUser} = require("../../middlewares/authorize");
const {User : UserC} = require("../../utils/consts");

const Router = require("express").Router();

Router.route("/")
    .post(
        authenticate(),
        authorizeTypeUser([UserC.TYPES.ADMIN]),
        validateRequest(TypePetController.create)
    )
    .get(
        validateRequest(TypePetController.all)
    )
    .delete(
        authenticate(),
        authorizeTypeUser([UserC.TYPES.ADMIN]),
        validateRequest(TypePetController.deleteAll)
    )

Router.route("/:idTypePet")
    .get(
        validateSchema(GetTypePetSchemaValidation),
        validateRequest(TypePetController.findById)
    )
    .put(
        authenticate(),
        authorizeTypeUser([UserC.TYPES.ADMIN]),
        validateSchema(GetTypePetSchemaValidation, "params"),
        validateSchema(PutTypePetSchemaValidation),
        validateRequest(TypePetController.update)
    )
    .patch(
        authenticate(),
        authorizeTypeUser([UserC.TYPES.ADMIN]),
        validateSchema(GetTypePetSchemaValidation, "params"),
        validateSchema(PatchTypePetSchemaValidation),
        validateRequest(TypePetController.update)
    )
    .delete(
        authenticate(),
        authorizeTypeUser([UserC.TYPES.ADMIN]),
        validateSchema(GetTypePetSchemaValidation, "params"),
        validateRequest(TypePetController.deleteOne)
    )

module.exports = Router;