const {LostPetComment} = require("../models/LostPetComent/LostPetComent.model");
const {LostPet} = require("../models/LostPet/lostPet.model");
const {NotFoundLostPetException} = require("../models/LostPet/lostPet.exception");
const {Types} = require("mongoose");
const {NotFoundLostPetCommentException} = require("../models/LostPetComent/LostPetComment.exception");

const create = async (idUser, {lostPet:lostPetId, ...rest}) => {
    const lostPet = await LostPet.findLostPets({_id:lostPetId});
    if(!lostPet) throw new NotFoundLostPetException("El registro de la mascota perdida con el id especificado(lostPet) no existe.");
    const newLostPetComment = await new LostPetComment({
        lostPet: lostPetId,
        user: idUser,
        ...rest
    })
    await newLostPetComment.save();
    delete newLostPetComment._doc.status;
    return newLostPetComment;
}

const getAll = async () => {
    const lostPetComments = await LostPetComment.find({
        status: 1
    });
    return lostPetComments;
};

const getById = async (idLostPetComment) => {
    const lostPetComment = await LostPetComment.findOne({
        _id: Types.ObjectId(idLostPetComment),
        status: 1
    });
    if(!lostPetComment){
        throw new NotFoundLostPetCommentException();
    }
    return lostPetComment;
};

module.exports = {
    create,
    getAll,
    getById
}