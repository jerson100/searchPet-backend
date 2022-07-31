const {Province} = require("../models/Province/province.model");

const createProvince = async (req, res) => {
    const {idDepartament, name} = req.body;
    const newProvince = await Province({name, idDepartament});
    await newProvince.save();
    return res.status(201).json(newProvince);
}

const getAllProvinces = async (req, res) => {
    const provinces = await Province.find();
    return res.json(provinces);
}

const deleteProvince = async (req, res) => {
    const deletedProvince = await Province.findByIdAndUpdate(req.params.idProvince, {
        $set: {
            status: 0
        }
    })
    return res.send();
}

module.exports = {createProvince, getAllProvinces, deleteProvince}