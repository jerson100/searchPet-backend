const UserService = require("../services/userService");

const getAllUsers = async (req, res) => {
    const users = await UserService.getAllUsers();
    return res.status(200).json(users);
};

const createUser = async (req, res) => {
    const user = await UserService.createUser(req.body);
    return res.status(201).json(user);
};

const deleteUser = async (req, res) => {
    await UserService.deleteUser(req.params.idUser);
    return res.status(204).send();
};

const updateUser = async (req, res) => {
    const us = await UserService.updateUser(req.params.idUser, req.body);
    return res.json(us);
}

const findUserById = async (req, res) => {
    const user = await UserService.findUserById(req.params.idUser);
    return res.json(user);
};

const deleteAllUser = async (req, res) => {
    await UserService.deleteAllUser();
    return res.status(204).send();
}

const getMyPets = async (req, res) => {
    const {idUser} = req.params;
    const pets = await UserService.getMyPets(idUser);
    return res.json(pets);
}

module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
    findUserById,
    deleteAllUser,
    getMyPets
}