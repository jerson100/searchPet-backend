const LostPetCommentController = require("../../controllers/LostPetComment.controller");
const {CreateLostPetCommentSchema} =  require("../../models/LostPetComent/LostPetComment.validation");
const {Router} = require("express");
const {authenticate} = require("../../middlewares/authenticate");
const {validateSchema} = require("../../middlewares/validateSchema");
const {validateRequest} = require("../../middlewares/validateRequest");
const LostPetCommentRouter = Router();

LostPetCommentRouter.route("/")
    .post(
        authenticate(),
        validateSchema(CreateLostPetCommentSchema),
        validateRequest(LostPetCommentController.create)
    )
    .get(
        validateRequest(LostPetCommentController.getAll)
    )

module.exports = LostPetCommentRouter;