const DistrictService = require("../services/districtService");

const createDistrict = async (req, res) => {
    const newDistrict = await DistrictService.createDistrict(req.body);
    return res.status(201).json(newDistrict);
}

const getAllDistricts = async (req, res) => {
    const districts = await DistrictService.getAllDistricts();
    return res.json(districts);
};

const deleteDistrict = async (req, res) => {
    await DistrictService.deleteDistrict(req.params.idDistrict);
    return res.status(204).send();
}

const updateDistrict = async (req, res) => {
    const updatedDistrict = await DistrictService.updateDistrict(req.params.idDistrict, req.body);
    return res.json(updatedDistrict)
}

const getOneDistrictById = async (req, res) => {
    const district = await DistrictService.getOneDistrictById(req.params.idDistrict);
    return res.json(district);
};

const deleteAllDistricts = async (req, res) => {
    await DistrictService.deleteAllDistricts();
    return res.status(204).send();
}

module.exports = {
    createDistrict,
    getAllDistricts,
    deleteDistrict,
    updateDistrict,
    getOneDistrictById,
    deleteAllDistricts
}