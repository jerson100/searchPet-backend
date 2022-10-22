const LostPetService = require("../services/lostPetService");
const {toFileArray} = require("../utils/file");
const UserActivityService = require("../services/UserActivityService");

const create = async (req, res) => {
    const { _id } = req.user;
    const newLostPet = await LostPetService.create(_id, req.body, req.files && req.files.images && toFileArray(req.files));
    await UserActivityService.create(
        {
            user: _id, model: "LostPet", description:"Realizó una publicación de perdida de la mascota(s)",doc: newLostPet._doc._id, action: "c"
        }
    )
    return res.status(201).json(newLostPet);
}

const getById = async (req, res) => {
    const lostPet = await LostPetService.getById(req.params.idLostPet);
    res.status(200).json(lostPet);
}

const deleteOne = async (req, res) => {
    const {idLostPet} = req.params;
    const {_id:idUser} = req.user;
    await LostPetService.deleteOne(idLostPet);
    await UserActivityService.create(
        {
            user: idUser, model: "LostPet",description:"Eliminó la mascota", doc: idLostPet, action: "d"
        }
    )
    return res.status(204).send();
}

const getAll = async (req, res) => {
    const {length, page, ...rest} = req.query;
    const lostPets = await LostPetService.getAll(rest, {length, page});
    return res.json(lostPets);
}

const getCommentsById = async (req, res) => {
    const {idLostPet} = req.params;
    const comments = await LostPetService.getCommentsById(idLostPet);
    return res.json(comments);
}

module.exports = {
    create,
    getById,
    deleteOne,
    getAll,
    getCommentsById
}