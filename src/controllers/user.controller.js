const User = require("../models/User/user.model");
const {generatePassword} = require("../utils/password");
const {ExistingUserException, NotFoundUserException, UserCreationException} = require("../models/User/User.exception");
const {District} = require("../models/District/disctrict.model");
const {Types} = require("mongoose");

const getAllUsers = async (req, res) => {
    const users = await findUs({},{password: 0});
    return res.status(200).json(users);
};

const createUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email});
    if(user) throw new ExistingUserException("No se pudo crear el usuario, intente con otra cuenta de email");
    // const district = await District.findOne({_id: req.body.district, status: 1});
    // if(!district) throw new UserCreationException("No se pudo crear un usuario porque el distrito no existe");
    const password = await generatePassword(req.body.password);
    const newUser = await User({
        ...req.body,
        password: password
    })
    await newUser.save();
    const newUserObj = newUser.toObject();
    delete newUserObj.password;
    delete newUserObj.status;
    return res.status(201).json(newUserObj);
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

const deleteUser = async (req, res) => {
    const us = await User.findOne({_id: req.params.idUser, status: 1});
    if(!us || !us.status) throw new NotFoundUserException();
    await User.findByIdAndUpdate(req.params.idUser, {
        $set: { status: 0 }
    });
    return res.status(204).send();
};

const updateUser = async (req, res) => {
    const us = await User.findOne({_id: req.params.idUser, status: 1});
    if(!us || !us.status) throw new NotFoundUserException();
    if(req.body.email){
        const user = await User.findOne({_id: { $ne: req.params.idUser }, email: req.body.email});
        if(user) throw new ExistingUserException("No se pudo actualizar el usuario, intente con otra cuenta de email");
    }
    if(req.body.district){
        const district = await District.findOne({_id: req.body.district, status: 1});
        if(!district) throw new UserCreationException("No se pudo actualizar el usuario porque el distrito indicado no existe");
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.idUser, {
        $set: req.body
    },{
        new: true
    });
    delete updatedUser._doc.status;
    delete updatedUser._doc.password;
    return res.json(updatedUser)
}

const findUserById = async (req, res) => {
    const user = await findUs({
        _id: Types.ObjectId(req.params.idUser)
    },{password: 0, status: 0});
    if(!user.length) throw new NotFoundUserException();
    return res.json({...user[0]});
};

const deleteAllUser = async (req, res) => {
    await User.updateMany({status: 1}, { $set: { status: 0 }});
    return res.status(204).send();
}

module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
    findUserById,
    deleteAllUser
}