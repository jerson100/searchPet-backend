const {Province} = require("../models/Province/province.model");

const createProvince = () => async (req, res) => {
    const {idDepartament, name} = req.body;
    const newProvince = await Province({name, idDepartament});
    await newProvince.save();
    return res.status(201).json(newProvince);
}

const getAllProvinces = () => async (req, res) => {
    const provinces = await Province.find();
    return res.json(provinces);
}

module.exports = {createProvince, getAllProvinces}