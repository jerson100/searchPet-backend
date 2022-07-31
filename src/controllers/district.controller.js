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

const deleteDistrict = async (req, res) => {
    const deletedDistrict = await District.findByIdAndUpdate(req.params.idDistrict, {
        $set: {
            status: 0
        }
    })
    return res.send();
}

const updateDistrict = async (req, res) => {
    const updatedDistrict = await District.findByIdAndUpdate(req.params.idDistrict, {
        $set: req.body
    },{
        new: true
    });
    return res.json(updatedDistrict)
}

const findDistrictById = async (req, res) => {
    const district = await District.findById(req.params.idDistrict);
    return res.json(district);
};

const deleteAllDistricts = async (req, res) => {
    const deletedDistricts = await District.deleteMany();
    return res.send();
}

module.exports = {
    createDistrict,
    getAllDistricts,
    deleteDistrict,
    updateDistrict,
    findDistrictById,
    deleteAllDistricts
}