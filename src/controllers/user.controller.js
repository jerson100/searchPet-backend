const User = require("../models/User/user.model");

const getAllUsers = async (req, res) => {
    const users = await User.find({},{password:0});
    return res.status(200).json(users);
};

const createUser = async (req, res) => {
    const newUser = await User(req.body)
    await newUser.save();
    const newUserObj = newUser.toObject();
    delete newUserObj.password;
    return res.status(201).json(newUserObj);
};

const deleteUser = async (req, res) => {
    const deletedUser = await User.findByIdAndUpdate(req.params.idUser, {
        $set: {
            status: 0
        }
    });
    return res.status(200).send();
};

const updateUser = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.idUser, {
        $set: req.body
    },{
        new: true
    });
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