const User = require("../models/User/user.model");
const {generatePassword} = require("../utils/password");
const {ExistingUserException, NotFoundUserException} = require("../models/User/User.exception");
const  {Schema: {Types}} = require("mongoose")
const {District} = require("../models/District/disctrict.model");
const {DistrictNotFoundException} = require("../models/District/district.exception");

const getAllUsers = async (req, res) => {
    const users = await User.aggregate([
        {
            $match: {
                status: 1
            }
        },
        {
            $lookup:
                {
                    from: "districts",
                    let: {
                        idDistrict: "$district"
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
                                "idProvince":1
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
        }
    ])
    return res.status(200).json(users);
};

const createUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email});
    if(user) throw new ExistingUserException("No se pudo crear el usuario, intente con otra cuenta de email");
    const district = await District.findOne({_id: req.body.district, status: 1});
    if(!district) throw new DistrictNotFoundException();
    const password = await generatePassword(req.body.password);
    const newUser = await User({
        ...req.body,
        password: password
    })
    await newUser.save();
    const newUserObj = newUser.toObject();
    delete newUserObj.password;
    return res.status(201).json(newUserObj);
};

const findUs = async (idUser) => {
    const us = await User.aggregate([
        {
            $match: {
                status: 1,
                _id: Types.ObjectId(idUser)
            }
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
                                "idProvince":1
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
        }
    ]);
    return us.length > 0 ? us[0] : null;
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
        if(!district) throw new DistrictNotFoundException();
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.idUser, {
        $set: req.body
    },{
        new: true
    });
    return res.json(updatedUser)
}

const findUserById = async (req, res) => {
    const user = await findUs(req.params.idUser);
    if(!user) throw new NotFoundUserException();
    return res.json(user);
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