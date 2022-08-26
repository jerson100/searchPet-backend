const {Pet} = require("../models/Pet/pet.model");
const User = require("../models/User/user.model");
const {CreatePetException, NotFoundPetException, UpdatePetException} = require("../models/Pet/pet.exception");
const {Breed} = require("../models/Breed/breed.model");

const create = async (idUser, {name, breed,...rest}) => {
    const us = await User.findOne({_id: idUser, status: 1},{});
    if(!us) throw new CreatePetException("No se pudo crear la moscota porque el usuario especificado no existe");
    const bd = await Breed.findOne({_id: breed, status: 1});
    if(!bd) throw new CreatePetException("No se pudo crear la mascota porque la raza especificada no existe") ;
    const newPet = await new Pet({name, user: idUser, breed, ...rest});
    await newPet.save();
    delete newPet._doc.status;
    return newPet;
};

const findById = async (id) => {
    const pet = await Pet.findOne({_id: id, status: 1}, { status: 0});
    if(!pet) throw new NotFoundPetException();
    return pet;
}

const getAll = async () => {
    const pets = await Pet.find({status: 1}, {status: 0});
    return pets;
}

const update = async (idUser, idPet, data) => {
    //No hay necesidad de buscar si existe la moscota
    //porque ya lo estamos haciendo en el authorizeMyResource
    if(data.breed){
        const br = Breed.findOne({_id: data.breed, status: 1});
        if(!br) throw new UpdatePetException("No se pudo actualizar la mascota porque la raza no existe");
    }
    const updatedPet = await Pet.findOneAndUpdate({_id: idPet}, { $set: { user:idUser, ...data } }, {new:true});
    delete updatedPet._doc.status;
    return updatedPet;
}

const deleteOne = async (idPet) => {
    const deletedPet = await Pet.findOneAndUpdate({_id: idPet, status: 1},{
        $set: { status: 0 }
    },{new: true});
    if(!deletedPet) throw NotFoundPetException();
}

const deleteAll = async () => {
    await Pet.updateMany({ status: 1 }, {
        $set: { status: 0 }
    } )
}

module.exports = {
    create,
    findById,
    getAll,
    update,
    deleteOne,
    deleteAll
}