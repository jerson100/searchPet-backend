const PetController = require("../../controllers/pet.controller");
const {validateSchema} = require("../../middlewares/validateSchema");
const {validateRequest} = require("../../middlewares/validateRequest");
const {authenticate} = require("../../middlewares/authenticate");
const {authorizeTypeUser, authorizeMyResource} = require("../../middlewares/authorize");
const {User : UserC} = require("../../utils/consts");
const {CreatePetSchemaValidation, GetPetSchemaValidation, PutPetSchemaValidation, PatchPetSchemaValidation} = require("../../models/Pet/pet.validation");
const {Pet} = require("../../models/Pet/pet.model");
const Router = require("express").Router();
const fileUpload = require("express-fileupload");
const {mimeType, MIME_TYPE_CONFIG} = require("../../middlewares/mimeType");
const {removeFilesFromObject} = require("../../utils/file");

Router.route("/")
    .get(
        authenticate(),
        validateRequest(PetController.getAll)
    )
    .post(
        authenticate(),
        authorizeTypeUser([UserC.TYPES.ADMIN, UserC.TYPES.USER]),
        validateSchema(CreatePetSchemaValidation, "body"),
        validateRequest(PetController.create)
    )
    .delete(
        authenticate(),
        authorizeTypeUser([UserC.TYPES.ADMIN]),
        validateRequest(PetController.deleteAll)
    )

Router.put(
    "/:idPet/upload-profile",
    authenticate(),
    authorizeMyResource(Pet, "idPet", [UserC.TYPES.ADMIN], "user", "params","pet"),
    fileUpload({
        tempFileDir: "./src/uploads/temp",
        useTempFiles: true,
        limits: {
            fileSize: 2 * 1024 * 1024,
            files: 1
        },
        responseOnLimit: JSON.stringify({
            message: "El tamaño límite del archivo es 2mb"
        }),
        abortOnLimit: true,
    }),
    validateSchema(GetPetSchemaValidation, "params", (req)=>{
        removeFilesFromObject(req.files)
    }),
    mimeType(MIME_TYPE_CONFIG.IMAGES),
    validateRequest(PetController.uploadProfile)
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