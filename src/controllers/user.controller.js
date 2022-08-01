const User = require("../models/User/user.model");
const {generatePassword} = require("../utils/password");
const {ExistingUserException, NotFoundUserException} = require("../models/User/User.exception");

const getAllUsers = async (req, res) => {
    const users = await User.find({},{password:0});
    return res.status(200).json(users);
};

const createUser = async (req, res) => {
    const password = await generatePassword(req.body.password);
    const user = await findUs(req.body.username);
    if(user) throw new ExistingUserException();
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
    const us = await User.findOne({_id: idUser});
    return us;
}

const deleteUser = async (req, res) => {
    const us = await findUs(req.params.idUser);
    if(!us || !us.status) throw new NotFoundUserException();
    await User.findByIdAndUpdate(req.params.idUser, {
        $set: { status: 0 }
    });
    return res.status(204).send();
};

const updateUser = async (req, res) => {
    const us = await findUs(req.params.idUser);
    if(!us || !us.status) throw new NotFoundUserException();
    const updatedUser = await User.findByIdAndUpdate(req.params.idUser, {
        $set: req.body
    },{
        new: true
    });
    if(updatedUser){

    }
    return res.json(updatedUser)
}

const findUserById = async (req, res) => {
    const user = await User.findById(req.params.idUser);
    return res.json(user);
};

const deleteAllUser = async (req, res) => {
    const deletedUsers = await User.deleteMany();
    return res.send();
}

module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
    findUserById,
    deleteAllUser
}