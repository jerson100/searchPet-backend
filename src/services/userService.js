const User = require("../models/User/user.model");
const {generatePassword} = require("../utils/password");
const {ExistingUserException, NotFoundUserException, UserCreationException} = require("../models/User/User.exception");
const {District} = require("../models/District/disctrict.model");
const {Types} = require("mongoose");
const {Pet} = require("../models/Pet/pet.model");
const UserActivityService = require("./UserActivityService");
const {LostPet} = require("../models/LostPet/lostPet.model");

const getAllUsers = async () => {
    const users = await findUs({},{password: 0});
    return users;
};

const createUser = async (data) => {
    const user = await User.findOne({ email: data.email});
    if(user) throw new ExistingUserException();
    if(data.district){
        const existsD = await District.existsDistrict(data.district);
        if(!existsD){
            throw new UserCreationException("No se pudo crear el usuario porque el distrito indicado no existe");
        }
    }
    const password = await generatePassword(data.password);
    const newUser = await User({
        ...data,
        password: password
    })
    await newUser.save();
    const newUserObj = newUser.toObject();
    delete newUserObj.password;
    delete newUserObj.status;
    return newUserObj;
};

const findUs = async (query={}, project= { __v: 0}) => {
    const users = await User.aggregate([
        {
            $match: query
        },
        {
            $lookup:
                {
                    from: "districts",
                    let: {
                        district: "$district"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$_id","$$district"],
                                },
                                status: 1
                            },
                        },
                        {
                            $project: {
                                "name": 1,
                                "province":1
                            }
                        }
                    ],
                    as: "district"
                }
        },
        {
            $unwind: {
                path: "$district",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project : project
        }
    ]);
    return users;
}

const deleteUser = async (idUser) => {
    const us = await User.findOneAndUpdate({
        _id: idUser, status: 1
    },{
        $set: {
            status: 0
        }
    })
    if(!us) throw new NotFoundUserException();
};

const updateUser = async (idUser, data) => {
    const us = await User.findOne({_id: idUser});
    if(!us || !us.status) throw new NotFoundUserException();
    if(data.email){
        const user = await User.findOne({_id: { $ne: idUser }, email: data.email});
        if(user) throw new ExistingUserException("No se pudo actualizar el usuario, intente con otra cuenta de email");
    }
    if(data.district){
        const existsD = await District.existsDistrict(data.district);
        if(!existsD){
            throw new UserCreationException("No se pudo actualizar el usuario porque el distrito indicado no existe");
        }
    }
    const updatedUser = await User.findByIdAndUpdate(idUser, {
        $set: data
    },{
        new: true
    });
    delete updatedUser._doc.status;
    delete updatedUser._doc.password;
    return updatedUser;
}

const findUserById = async (idUser) => {
    const user = await findUs({
        _id: Types.ObjectId(idUser)
    },{password: 0, status: 0});
    if(!user.length) throw new NotFoundUserException();
    return user[0];
};

const deleteAllUser = async () => {
    await User.updateMany({status: 1}, { $set: { status: 0 }});
}

const getMyPets = async (idUser, pagination={page, length}) => {
    const objIdUser = Types.ObjectId(idUser);
    const user = await User.findOne( { _id: objIdUser,status: 1 } )
    if(!user){ throw new NotFoundUserException(); }
    const pets = await Pet.findPets({
        query: {
            user: objIdUser,
            status: 1
        },
        length:pagination.length,
        page:pagination.page,
        project: {
            "user.password": 0,
            "user.district": 0,
            "user.birthday": 0,
            "user.status": 0,
            "user.__v": 0,
            "user.updatedAt": 0,
            "__v": 0,
            "breed.__v": 0,
            "breed.typePet": 0,
            "breed.status": 0,
            "status": 0,
        }
    });
    return pets;
}

const getActivities = async (idUser) => {
    const activities = await UserActivityService.getActivitiesByIdUser(idUser);
    return activities;
}

const getMyLostPet = async (idUser, length, page) => {
    const us = await User.findOne({_id: idUser, status: 1});
    if(!us) throw new NotFoundUserException();
    const lostPet = await LostPet.aggregate([
        {
            $match: { status: 1 }
        },
        {
            $lookup: // Equality Match
                {
                    from: "users",
                    let: { idUser: "$user" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$_id", "$$idUser"]
                                },
                                status: 1
                            }
                        }
                    ],
                    as: "user"
                }
        },
        {
            $unwind: {
                path: "$user",
                preserveNullAndEmptyArrays: false
            }
        },
        {
            $match: {
                "user._id":Types.ObjectId(idUser)
            }
        },
        {
            $lookup: {
                from: "pets",
                localField: "pets",
                foreignField: "_id",
                as: "pets"
            }
        },
        {
            $project: {
                "user": {
                    _id: "$user._id",
                    name: "$user.name",
                    paternalSurname: "$user.paternalSurname",
                    maternalSurname: "$user.maternalSurname",
                    username: "$user.username",
                    email:"$user.email",
                    status: "$user.status",
                    typeUser:"$user.typeUser",
                    urlImageProfile: "$user.urlImageProfile"
                },
                pets: {
                    $filter: {
                        input: "$pets",
                        as: "pet",
                        cond: {
                            $eq: ["$$pet.status", 1]
                        }
                    }
                },
                images: 1,
                located: 1,
                createdAt: 1
            }
        },
        // Stage 7
        {
            $match: {
                $expr: {
                    $gte: [
                        {
                            $size: "$pets"
                        },
                        1
                    ]
                }
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $skip: (page <= 1 ? 0 : page - 1) * length
        },
        {
            $limit: length
        }
    ])
    return lostPet;
}

module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
    findUserById,
    deleteAllUser,
    getMyPets,
    getActivities,
    getMyLostPet
}