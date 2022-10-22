const LostPetComemntService = require("../services/lostPetCommentService");
const UserActivityService = require("../services/UserActivityService");

const create = async (req, res) => {
    const {_id: idUser} = req.user;
    const newLostPetComment = await LostPetComemntService.create(idUser, req.body);
    await UserActivityService.create(
        {
            user: idUser, model: "LostPetComment", description:"Realizó un comentario", doc: newLostPetComment._doc._id, action: "c"
        }
    )
    return res.status(201).json(newLostPetComment);
}

const getAll = async (req, res) => {
    const lostPetComments = await LostPetComemntService.getAll();
    return res.json(lostPetComments)
}

const getById = async (req, res) =>  {
    const {idLostPetComment} = req.params;
    const lostPetComment = await LostPetComemntService.getById(idLostPetComment);
    return res.json(lostPetComment);
}

const deleteOne = async (req, res) => {
    const { comment, params: {idLostPetComment}, user: { _id: idUser} } = req;
    await LostPetComemntService.deleteOne(idLostPetComment, comment);
    await UserActivityService.create(
        {
            user: idUser, model: "LostPetComment",description:"Eliminó un comentario", doc: idLostPetComment, action: "d"
        }
    )
    return res.status(204).send();
}

module.exports = {
    create,
    getAll,
    getById,
    deleteOne
}