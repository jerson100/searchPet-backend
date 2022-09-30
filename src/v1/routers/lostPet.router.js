const {Router} = require("express");
const {authenticate} = require("../../middlewares/authenticate");
const {validateSchema} = require("../../middlewares/validateSchema");
const {CreateLostPetSchemaValidation, GetLostPetSchemaValidation, LostPetPaginationSchemaValidation,
    LostPetQueryParamsSchemaValidation
} = require("../../models/LostPet/lostPet.validation");
const {validateRequest} = require("../../middlewares/validateRequest");
const LosPetController = require("../../controllers/lostPet.controller");
const {validateFile} = require("../../middlewares/validateFile");
const CONSTS = require("../../utils/consts");
const {authorizeMyResource} = require("../../middlewares/authorize");
const {LostPet} = require("../../models/LostPet/lostPet.model");

const LostPetRouter = Router();

LostPetRouter.route("/")
    .get(
        validateSchema(LostPetQueryParamsSchemaValidation, "query"),
        validateRequest(LosPetController.getAll)
    )
    .post(
        authenticate(),
        validateFile(
            {
                limits: {
                    fileSize: 2 * 1024 * 1024,
                    files: 10
                },
                responseOnLimit: JSON.stringify({
                    message: "El tamaño límite del archivo es 2mb"
                }),
            },
            CONSTS.FILES.MIME_TYPE.IMAGES
        ),
        validateSchema(CreateLostPetSchemaValidation, "body"),
        validateRequest(LosPetController.create)
    )

LostPetRouter.route("/:idLostPet")
    .get(
        validateSchema(GetLostPetSchemaValidation,"params"),
        validateRequest(LosPetController.getById)
    )
    .delete(
        authenticate(),
        authorizeMyResource(LostPet,"idLostPet", [CONSTS.User.TYPES.ADMIN],"_id","params"),
        validateSchema(GetLostPetSchemaValidation),
        validateRequest(LosPetController.deleteOne)
    )

module.exports = LostPetRouter;