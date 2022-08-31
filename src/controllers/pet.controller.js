const PetService = require("../services/petService");

const create = async (req, res) => {
    const newPet = await PetService.create(req.user._id,req.body, req.files?.urlImageProfile);
    return res.status(201).json(newPet);
}

const findById = async (req, res) => {
    const {idPet} = req.params;
    const pet = await PetService.findById(idPet);
    return res.json(pet);
}

const getAll = async (req, res) => {
    const {_id: idUser} = req.user;
    const pets = await PetService.getAll(idUser);
    return res.json(pets);
}

const update = async (req, res) => {
    const { idPet } = req.params;
    const { _id : idUser }  = req.user;
    const updatedPet = await PetService.update(idUser, idPet, req.body);
    return res.json(updatedPet);
}

const deleteOne = async (req, res) => {
    const {idPet} = req.params;
    await PetService.deleteOne(idPet);
    return res.status(204).send();
}

const deleteAll = async (req, res) => {
    await PetService.deleteAll();
    return res.status(204).send();
}

module.exports = {
    create,
    update,
    getAll,
    findById,
    deleteOne,
    deleteAll
}