const LostPetCommentController = require("../../controllers/LostPetComment.controller");
const {CreateLostPetCommentSchema, GetLostPetCommentSchema} =  require("../../models/LostPetComent/LostPetComment.validation");
const {Router} = require("express");
const {authenticate} = require("../../middlewares/authenticate");
const {validateSchema} = require("../../middlewares/validateSchema");
const {validateRequest} = require("../../middlewares/validateRequest");
const {authorizeMyResource} = require("../../middlewares/authorize");
const {LostPetComment} = require("../../models/LostPetComent/LostPetComent.model");
const LostPetCommentRouter = Router();
const CONSTS = require("../../utils/consts");

LostPetCommentRouter.route("/")
    .post(
        authenticate(),
        validateSchema(CreateLostPetCommentSchema),
        validateRequest(LostPetCommentController.create)
    )
    .get(
        validateRequest(LostPetCommentController.getAll)
    )

LostPetCommentRouter.route("/:idLostPetComment")
    .delete(
        authenticate(),
        validateSchema(GetLostPetCommentSchema, "params"),
        authorizeMyResource(LostPetComment, "idLostPetComment", [CONSTS.User.TYPES.ADMIN], "user", "params", "comment"),
        validateRequest(LostPetCommentController.deleteOne)
    )

module.exports = LostPetCommentRouter;