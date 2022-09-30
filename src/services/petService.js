const {Pet} = require("../models/Pet/pet.model");
const {Types} = require("mongoose");
const {CreatePetException, NotFoundPetException, UpdatePetException} = require("../models/Pet/pet.exception");
const {Breed} = require("../models/Breed/breed.model");
const fs = require("fs-extra");
const {upload, destroy} = require("../configs/cloudinary");
const {toFileArray} = require("../utils/file");

const create = async (idUser, {name, breed,...rest}) => {
    const bd = await Breed.findOne({_id: breed, status: 1})
        .populate( { path: "typePet" } );
    if(!bd?.typePet?.status || !bd?.status){
        throw new CreatePetException("No se pudo crear la mascota porque la raza especificada no existe")
    }
    const newPet = await new Pet({name, user: idUser, breed, ...rest});
    await newPet.save();
    delete newPet._doc.status;
    return newPet;
};

const uploadImages = async (idPet, images) => {
    const files = toFileArray(images);
    const urls = [];
    try{
        for(let i = 0; i < files.length; i++){
            const image = files[i];
            const uploadedImage = await upload(image.tempFilePath);
            urls.push(uploadedImage.secure_url);
            fs.remove(image.tempFilePath);
        }
    }catch(e){
        throw new CreatePetException("No se logró subir las imágenes.")
    }
    const uploaded =  await Pet.findOneAndUpdate(
        { _id: idPet },
        { $push: { images: { $each: urls } } },
        { new: true }
    );
    return uploaded._doc.images;
};

const deleteImages = async (idPet, images) => {
    await Pet.findOneAndUpdate(
        {
            _id: idPet
        },
        {
            $pull: {
                images: {
                    $in: images
                }
            }
        },
        {
            new: true
        }
    )
    const regex = /^.*[/](.*)[.].*$/i;
    const publicIds = images.map(image=>{
        const groups = regex.exec(image);
        return groups?.length === 2 ?`sPet/pets/${groups[1]}` : ""
    })
    for(let i = 0; i < publicIds.length; i++){
        try{
            if(publicIds[i]) await destroy(publicIds[i]);
        }catch(e){}
    }
}

const uploadProfile = async (idPet, profile, pet)  => {
    let urlImageProfile = null;
    if(profile){
        try{
            const uploadedImage = await upload(profile.tempFilePath);
            urlImageProfile = uploadedImage.secure_url;
            fs.remove(profile.tempFilePath);
        }catch(e){
            throw new CreatePetException("No se logró subir la imagen.")
        }
    }
    const uploadedPet = await Pet.findOneAndUpdate(
        { _id: idPet },
        profile ? { $set: { urlImageProfile }  } : { $unset : { urlImageProfile : 1 } },
        { new: true }
    );
    if(pet.urlImageProfile){
        const regex = /^.*[/](.*)[.].*$/i;
        const groups = regex.exec(pet.urlImageProfile);
        const publicId =  groups?.length === 2 &&`sPet/pets/${groups[1]}`;
        try{ if(publicId){ await destroy(publicId); } } catch(e) {}
    }
    return uploadedPet.urlImageProfile;
}

const findById = async (id) => {
    const pet = await Pet.findPets({
        query: {
            _id : Types.ObjectId(id),
            status: 1
        }
    });
    if(pet.length == 0) throw new NotFoundPetException();
    return pet[0];
}

const getAll = async ({typepet, length, page}) => {
    const pets = await Pet.findPets({ query: {status: 1}, typepet, length, page});
    return pets;
}

const update = async (idUser, idPet, data) => {
    //No hay necesidad de buscar si existe la moscota
    //porque ya lo estamos haciendo en el authorizeMyResource
    if(data.breed){
        const bd = await Breed.findOne({_id: data.breed, status: 1})
            .populate( { path: "typePet" } );
        if(!bd?.typePet?.status || !bd?.status){
            throw new UpdatePetException("No se pudo actualizar la mascota porque la raza especificada no existe")
        }
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
    deleteAll,
    uploadProfile,
    uploadImages,
    deleteImages
}