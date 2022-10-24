const PetService = require("../services/petService");
const {removeFilesFromObject} = require("../utils/file");
const UserActivityService = require("../services/UserActivityService");

const create = async (req, res) => {
    const newPet = await PetService.create(req.user._id,req.body, req.files?.profile);
    removeFilesFromObject(req.files);
    await UserActivityService.create(
        {
            user: req.user._id, model: "Pet",description:"Agregó la mascota", doc: newPet._doc._id, action: "c"
        }
    )
    return res.status(201).json(newPet);
}

const uploadProfile = async (req, res) => {
    const {files, pet} = req;
    const urlImageProfile = await PetService.uploadProfile(req.params.idPet, files?.profile, pet);
    removeFilesFromObject(req.files);
    await UserActivityService.create(
        {
            user: req.user._id, doc:pet._id,model:"Pet",description:"Actualizó la foto de perfil de la mascota", action: "u"
        }
    )
    return res.json({ urlImageProfile });
}

const uploadImages = async (req, res) => {
    const { files } = req;
    const images = await PetService.uploadImages(req.params.idPet, files);
    removeFilesFromObject(req.files);
    await UserActivityService.create(
        {
            user: req.user._id, doc:req.params.idPet,model:"Pet",description:"Actualizó algunas fotos de la mascota", action: "u"
        }
    )
    return res.status(201).json({images});
}

const deleteImages = async (req, res) => {
    const { images } = req.body;
    const { idPet } = req.params;
    const imagesUp = await PetService.deleteImages(idPet, images);
    await UserActivityService.create(
        {
            user: req.user._id, doc:idPet,
            model:"Pet",description:"Eliminó algunas fotos de la mascota", action: "d"
        }
    )
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
    await UserActivityService.create(
        {
            user: idUser, model: "Pet", description:"Actualizó los datos de la mascota",doc: idPet, action: "u"
        }
    )
    return res.json(updatedPet);
}

const deleteOne = async (req, res) => {
    const {idPet} = req.params;
    const {_id:idUser} = req.user;
    await PetService.deleteOne(idPet);
    await UserActivityService.create(
        {
            user: idUser, model: "Pet",description:"Eliminó la mascota", doc: idPet, action: "d"
        }
    )
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