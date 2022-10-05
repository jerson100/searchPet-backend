const LostPetComemntService = require("../services/lostPetCommentService");

const create = async (req, res) => {
    const {_id: idUser} = req.user;
    const newLostPetComment = await LostPetComemntService.create(idUser, req.body);
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

module.exports = {
    create,
    getAll,
    getById
}