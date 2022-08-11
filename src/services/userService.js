const User = require("../models/User/user.model");
const {generatePassword} = require("../utils/password");
const {ExistingUserException, NotFoundUserException, UserCreationException} = require("../models/User/User.exception");
const {District} = require("../models/District/disctrict.model");
const {Types} = require("mongoose");

const getAllUsers = async () => {
    const users = await findUs({},{password: 0});
    return users;
};

const createUser = async (data) => {
    const user = await User.findOne({ email: data.email});
    if(user) throw new Error();
    // const district = await District.findOne({_id: req.body.district, status: 1});
    // if(!district) throw new UserCreationException("No se pudo crear un usuario porque el distrito no existe");
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
    const us = await User.findOne({_id: idUser, status: 1});
    if(!us || !us.status) throw new NotFoundUserException();
    await User.findByIdAndUpdate(idUser, {
        $set: { status: 0 }
    });
};

const updateUser = async (idUser, data) => {
    const us = await User.findOne({_id: idUser, status: 1});
    if(!us || !us.status) throw new NotFoundUserException();
    if(data.email){
        const user = await User.findOne({_id: { $ne: idUser }, email: data.email});
        if(user) throw new ExistingUserException("No se pudo actualizar el usuario, intente con otra cuenta de email");
    }
    if(data.district){
        const district = await District.findOne({_id: data.district, status: 1});
        if(!district) throw new UserCreationException("No se pudo actualizar el usuario porque el distrito indicado no existe");
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

module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
    findUserById,
    deleteAllUser
}