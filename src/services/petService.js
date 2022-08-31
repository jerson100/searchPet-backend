const {Pet} = require("../models/Pet/pet.model");
const {Types} = require("mongoose");
const {CreatePetException, NotFoundPetException, UpdatePetException} = require("../models/Pet/pet.exception");
const {Breed} = require("../models/Breed/breed.model");
const fs = require("fs-extra");

const create = async (idUser, {name, breed,...rest}, imageProfile) => {
    if(imageProfile){

        fs.removeSync(imageProfile.tempFilePath);
    }
    // const bd = await Breed.findOne({_id: breed, status: 1})
    //     .populate( { path: "typePet" } );
    //
    // if(!bd?.typePet?.status || !bd?.status){
    //     throw new CreatePetException("No se pudo crear la mascota porque la raza especificada no existe")
    // }
    // const newPet = await new Pet({name, user: idUser, breed, ...rest});
    // await newPet.save();
    // delete newPet._doc.status;
    // return newPet;
};

const findPets = async (query={}) => {
    const pets = await Pet.aggregate([
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
    ]);
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

const getAll = async (idUser) => {
    console.log(idUser);
    const pets = await findPets({user: Types.ObjectId(idUser),status: 1});
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
    deleteAll
}