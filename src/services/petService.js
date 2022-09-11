const {Pet} = require("../models/Pet/pet.model");
const {Types} = require("mongoose");
const {CreatePetException, NotFoundPetException, UpdatePetException} = require("../models/Pet/pet.exception");
const {Breed} = require("../models/Breed/breed.model");
const fs = require("fs-extra");
const {upload, destroy} = require("../configs/cloudinary");
const {toFileArray} = require("../utils/file");
const {validateSchema} = require("../middlewares/validateSchema");
const {GetPetSchemaValidation} = require("../models/Pet/pet.validation");

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
    if(!images){
        throw new CreatePetException("Field images is required");
    }
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
            fs.remove(profile.tempFilePath);
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

const findPets = async (query={}, typepet) => {
    const stages = [
        {
            $match: query
        },
        {
            $lookup:
                {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user"
                }
        },
        {
            $unwind: {
                path: "$user",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $match: {
                "user.status": 1
            }
        },
        {
            $lookup:
                {
                    from: "breeds",
                    let: {
                        idBreed: "$breed"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr:  {
                                    $eq: ["$_id", "$$idBreed"]
                                },
                                status: 1
                            },
                        },
                        {
                            $lookup:{
                                from: "typepets",
                                let: {
                                    idTypePet: "$typePet"
                                },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $eq: ["$_id","$$idTypePet"]
                                            },
                                            status:1
                                        }
                                    }
                                ],
                                as: "typePet"
                            }
                        },
                        {
                            $unwind: {
                                path: "$typePet",
                                preserveNullAndEmptyArrays: false,
                            }
                        }
                    ],
                    as: "breed"
                }
        },
        {
            $unwind: {
                path: "$breed",
                preserveNullAndEmptyArrays: true,
            }
        },
        {
            $project: {
                status: 0,
                "breed.status": 0,
                "breed.typePet.status": 0,
                "user.status": 0,
                "user.password": 0,
                "user.birthday": 0,
                "user.location": 0,
                "user.district": 0,
                "user.typeUser": 0,
                "user.createdAt": 0,
                "user.updatedAt": 0
            }
        }
    ];
    if(typepet){
        stages.splice(7, 0, {
            $match: {
                "breed.typePet.type": typepet
            }
        })
    }
    const pets = await Pet.aggregate(stages);
    return pets;
}

const findById = async (id) => {
    const pet = await findPets({
        _id : Types.ObjectId(id),
        status: 1
    });
    if(pet.length == 0) throw new NotFoundPetException();
    return pet[0];
}

const getAll = async (query) => {
    console.log(query)
    const typepet = query.typepet;
    if(query.typepet){
        delete query.typepet;
    }
    const pets = await findPets({status: 1, ...query}, typepet);
    return pets;
}

const update = async (idUser, idPet, data) => {
    //No hay necesidad de buscar si existe la moscota
    //porque ya lo estamos haciendo en el authorizeMyResource
    if(data.breed){
        const bd = await Breed.findOne({_id: breed, status: 1})
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