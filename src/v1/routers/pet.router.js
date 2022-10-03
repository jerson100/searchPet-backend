const PetController = require("../../controllers/pet.controller");
const {validateSchema} = require("../../middlewares/validateSchema");
const {validateRequest} = require("../../middlewares/validateRequest");
const {authenticate} = require("../../middlewares/authenticate");
const {authorizeTypeUser, authorizeMyResource} = require("../../middlewares/authorize");
const CONSTS = require("../../utils/consts");
const {CreatePetSchemaValidation, GetPetSchemaValidation, PutPetSchemaValidation, PatchPetSchemaValidation,
    ImagesDeleteSchemaValidation, PetFilterSchemaValidation
} = require("../../models/Pet/pet.validation");
const {Pet} = require("../../models/Pet/pet.model");
const Router = require("express").Router();
const {validateFile} = require("../../middlewares/validateFile");

Router.route("/")
    .get(
        validateSchema(PetFilterSchemaValidation,"query"),
        validateRequest(PetController.getAll)
    )
    .post(
        authenticate(),
        authorizeTypeUser([CONSTS.User.TYPES.ADMIN, CONSTS.User.TYPES.USER]),
        validateFile(
            {
                limits: {
                    files: 1,
                    fileSize: 2 * 1024 * 1024
                },
                responseOnLimit: JSON.stringify({
                    message: "El tamaño límite del archivo es 2mb"
                }),
            },
            CONSTS.FILES.MIME_TYPE.IMAGES
        ),
        validateSchema(CreatePetSchemaValidation, "body"),
        validateRequest(PetController.create)
    )
    .delete(
        authenticate(),
        authorizeTypeUser([CONSTS.User.TYPES.ADMIN]),
        validateRequest(PetController.deleteAll)
    )

Router.put(
    "/:idPet/upload-profile",
    authenticate(),
    validateSchema(GetPetSchemaValidation, "params"),
    authorizeMyResource(Pet, "idPet", [CONSTS.User.TYPES.ADMIN], "user", "params","pet"),
    validateFile(
        {
            limits: {
                fileSize: 2 * 1024 * 1024,
                files: 1
            },
            responseOnLimit: JSON.stringify({
                message: "El tamaño límite del archivo es 2mb"
            }),
        },
        CONSTS.FILES.MIME_TYPE.IMAGES
    ),
    validateRequest(PetController.uploadProfile)
)

Router.route("/:idPet/images")
    .post(
        authenticate(),
        validateSchema(GetPetSchemaValidation, "params"),
        authorizeMyResource(Pet, "idPet", [CONSTS.User.TYPES.ADMIN], "user", "params","pet"),
        validateFile(
            {
                limits: {
                    fileSize: 3 * 1024 * 1024,
                    files: 10
                },
                responseOnLimit: JSON.stringify({
                    message: "El tamaño límite del archivo es 3mb"
                }),
            },
            CONSTS.FILES.MIME_TYPE.IMAGES,
            "images"
        ),
        validateRequest(PetController.uploadImages)
    )
    .delete(
        authenticate(),
        validateSchema(GetPetSchemaValidation,"params"),
        authorizeMyResource(Pet, "idPet", [CONSTS.User.TYPES.ADMIN], "user", "params","pet"),
        validateSchema(ImagesDeleteSchemaValidation, "body"),
        validateRequest(PetController.deleteImages)
    )

Router.route("/:idPet")
    .get(
        validateSchema(GetPetSchemaValidation, "params"),
        validateRequest(PetController.findById)
    )
    .put(
        authenticate(),
        validateSchema(GetPetSchemaValidation,"params"),
        authorizeMyResource(Pet, "idPet", [CONSTS.User.TYPES.ADMIN], "user"),
        validateSchema(PutPetSchemaValidation),
        validateRequest(PetController.update)
    )
    .patch(
        authenticate(),
        validateSchema(GetPetSchemaValidation, "params"),
        authorizeMyResource(Pet, "idPet", [CONSTS.User.TYPES.ADMIN], "user"),
        validateSchema(PatchPetSchemaValidation),
        validateRequest(PetController.update)
    )
    .delete(
        authenticate(),
        validateSchema(GetPetSchemaValidation, "params"),
        authorizeMyResource(Pet, "idPet", [CONSTS.User.TYPES.ADMIN], "user"),
        validateRequest(PetController.deleteOne)
    )

module.exports = Router;