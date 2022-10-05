const {LostPet} = require("../models/LostPet/lostPet.model");
const {CreateLostPetException, NotFoundLostPetException} = require("../models/LostPet/lostPet.exception")
const {Pet} = require("../models/Pet/pet.model");
const {Types} = require("mongoose");
const {upload, getPublicId, destroy} = require("../configs/cloudinary");
const fs = require("fs-extra");
const {LostPetComment} = require("../models/LostPetComent/LostPetComent.model");

const create = async (idUser, {pets, latitude, longitude, ...props}, images) => {
    const petsIds = pets.split(",").map(p => Types.ObjectId(p));
    const foundPets = await Pet.findPets({
        query: {
            status: 1,
            user: Types.ObjectId(idUser),
            _id: {
                $in: petsIds
            }
        },
        length: 10000,
        page: 1
    });
    if(foundPets.length !== petsIds.length) {
        throw new CreateLostPetException("No se pudo crear la solicitud porque indicó mascotas que no existen o no le pertenecen")
    }
    const imageIds = [];
    if(images){
        //subimos las imagenes a claudinary
        for(let i = 0; i < images.length; i++){
            try{
                const {secure_url} = await upload(images[i].tempFilePath);
                imageIds.push(secure_url);
                fs.remove(images[i].tempFilePath);
            }catch(e){
                throw new CreateLostPetException("No se pudo crear la solicitud de perdida de su mascota porque porque no se logró subir las imágenes, vuelva a intentarlo luego.");
            }
        }
    }
    const newDocument = {
        user: idUser,
        ...props,
        location: {
            longitude,
            latitude
        },
        pets: petsIds,
    }
    if(imageIds){ newDocument.images = imageIds; }
    const newLostPet = new LostPet(newDocument);
    await newLostPet.save();
    return newLostPet;
}

const getById = async (idLostPet) => {
    const lostPets = await LostPet.findLostPets( { _id: idLostPet, status: 1 } );
    if(!lostPets) throw new NotFoundLostPetException();
    return lostPets;
}

const getAll = async (query, pagination) => {
    const lostPets = await LostPet.findLostPets(
        {
            ...query,
            status: 1
        },
        {
            page: pagination.page,
            length: pagination.length
        }
    );
    // const lostPets = await LostPet.find(
    //     { status: 1,...query },
    //     { status:0, __v:0 }
    // )
    //     .populate({
    //         path: "user",
    //         select: "-password -status -__v -birthday -createdAt -updatedAt -typeUser -name -paternalSurname -maternalSurname -location",
    //         match: { status: 1 }
    //     })
    //     .populate({
    //         path: "pets",
    //         select: "-status -__v -user -createdAt -updatedAt -images -description -characteristics",
    //         match: { status: 1 },
    //         populate: {
    //             path: "breed",
    //             select: "-status -createdAt -updatedAt -characteristics -images -__v",
    //             match: { status: 1 }
    //         }
    //     })
    //     .skip((pagination.page > 0 ? pagination.page - 1 : pagination) * pagination.length)
    //     .limit(pagination.length);
    return lostPets;
}

const deleteOne = async (idLostPet) => {
    const lostPet = await LostPet.findOne({
        _id: idLostPet,
        status: 1
    }).populate({
        path: "user",
        match: {
            status: 1
        }
    })
    if(!lostPet?._doc?.user) throw new NotFoundLostPetException();
    await LostPet.updateOne({
        _id: idLostPet
    },{
        $set: {
            status: 0
        },
        $unset: {
            images: ""
        }
    });
    const imagesIds = lostPet._doc.images;
    imagesIds?.forEach(img => {
       const publicId = getPublicId(img);
       try{
           if(publicId){ destroy(`sPet/pets/${publicId}`) }
       }catch(e){}
    });
}

const getCommentsById = async (idLostPet) => {
    const comments = await LostPetComment.findOne({
        lostPet: Types.ObjectId(idLostPet),
        status: 1
    })
    return comments;
}

module.exports = {
    create,
    getById,
    deleteOne,
    getAll,
    getCommentsById
}