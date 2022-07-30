const User = require("../models/User/user.model");

const getAllUsers = () => async (req, res) => {
    const users = await User.find({},{password:0});
    return res.status(200).json(users);
};

const createUser = () => async (req, res) => {
    const {
        name,
        paternalSurname,
        maternalSurname,
        birthday,
        username,
        password,
        idDistrict
    } = req.body;
    const newUser = await User({
        name, paternalSurname, maternalSurname,
        birthday, username, password, idDistrict
    })
    await newUser.save();
    const newUserObj = newUser.toObject();
    delete newUserObj.password;
    return res.status(201).json(newUserObj);
};

module.exports = {
    getAllUsers,
    createUser
}