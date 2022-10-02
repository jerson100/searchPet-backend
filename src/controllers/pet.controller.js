const PetService = require("../services/petService");
const {removeFilesFromObject} = require("../utils/file");

const create = async (req, res) => {
    const newPet = await PetService.create(req.user._id,req.body, req.files?.profile);
    removeFilesFromObject(req.files);
    return res.status(201).json(newPet);
}

const uploadProfile = async (req, res) => {
    const {files, pet} = req;
    const urlImageProfile = await PetService.uploadProfile(req.params.idPet, files?.profile, pet);
    removeFilesFromObject(req.files);
    return res.json({ urlImageProfile });
}

const uploadImages = async (req, res) => {
    const { files } = req;
    const images = await PetService.uploadImages(req.params.idPet, files);
    removeFilesFromObject(req.files);
    return res.status(201).json({images});
}

const deleteImages = async (req, res) => {
    const { images } = req.body;
    const { idPet } = req.params;
    const imagesUp = await PetService.deleteImages(idPet, images);
    return res.status(204).json({ images : imagesUp });
}

const findById = async (req, res) => {
    const {idPet} = req.params;
    const pet = await PetService.findById(idPet);
    return res.json(pet);
}

const getAll = async (req, res) => {
    const pets = await PetService.getAll(req.query);
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
    deleteAll,
    uploadProfile,
    uploadImages,
    deleteImages
}