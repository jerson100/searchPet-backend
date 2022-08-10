const ProvinceService = require("../services/provinceService");

const createProvince = async (req, res) => {
    const newProvince = await ProvinceService.createProvince(req.body);
    return res.status(201).json(newProvince);
}

const getAllProvinces = async (req, res) => {
    const provinces = await ProvinceService.getAllProvinces()
    return res.json(provinces);
}

const deleteProvince = async (req, res) => {
    await ProvinceService.deleteProvince(req.params.idProvince);
    return res.status(204).send();
}

const updateProvince = async (req, res) => {
    const updatedProvince = await ProvinceService.updateProvince(req.params.idProvince, req.body);
    return res.json(updatedProvince);
}

const findProvinceById = async (req, res) => {
    const province = await ProvinceService.findProvinceById(req.params.idProvince);
    return res.json(province);
};

const deleteAllProvinces = async (req, res) => {
    await ProvinceService.deleteAllProvinces();
    return res.status(204).send();
}

module.exports = {createProvince, getAllProvinces, deleteProvince, updateProvince, findProvinceById, deleteAllProvinces}