const {District} = require("../models/District/disctrict.model");

const createDistrict = async (req, res) => {
    const {idProvince, name} = req.body;
    const newDistrict = await District({name, idProvince});
    await newDistrict.save();
    return res.status(201).json(newDistrict);
}

const getAllDistricts = async (req, res) => {
    const districts = await District.find();
    return res.json(districts);
};

module.exports = {
    createDistrict,
    getAllDistricts
}