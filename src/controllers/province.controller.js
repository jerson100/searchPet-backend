const {Province} = require("../models/Province/province.model");
const User = require("../models/User/user.model");

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

const updateProvince = async (req, res) => {
    const updatedProvince = await Province.findByIdAndUpdate(req.params.idProvince, {
        $set: req.body
    },{
        new: true
    });
    return res.json(updatedProvince)
}

const findProvinceById = async (req, res) => {
    const province = await User.findById(req.params.idProvince);
    return res.json(province);
};

const deleteAllProvinces = async (req, res) => {
    const deletedProvinces = await Province.deleteMany();
    return res.send();
}

module.exports = {createProvince, getAllProvinces, deleteProvince, updateProvince, findProvinceById, deleteAllProvinces}