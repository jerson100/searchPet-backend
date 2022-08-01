const {District} = require("../models/District/disctrict.model");
const {Province} = require("../models/Province/province.model");
const {DistrictNotFoundException, DistrictExistenceException} = require("../models/District/district.exception");
const {ProvinceNotFoundException} = require("../models/Province/province.exception");

const createDistrict = async (req, res) => {
    const {idProvince, name} = req.body;
    const district = await District.findOne({ name: req.body.name, status: 1})
    if(district) throw new DistrictExistenceException();
    const province = await Province.findOne({_id: idProvince, status: 1});
    if(!province) throw new ProvinceNotFoundException();
    const newDistrict = await District({name, idProvince});
    await newDistrict.save();
    return res.status(201).json(newDistrict);
}

const getAllDistricts = async (req, res) => {
    const districts = await District.find({status: 1});
    return res.json(districts);
};

const deleteDistrict = async (req, res) => {
    const district = await District.findOne({ _id:req.params.idDistrict, status: 1})
    if(!district) throw new DistrictNotFoundException();
    await District.findByIdAndUpdate(req.params.idDistrict, {
        $set: {
            status: 0
        }
    });
    return res.status(204).send();
}

const updateDistrict = async (req, res) => {
    const district = await District.findOne({ _id:req.params.idDistrict, status: 1})
    if(!district) throw new DistrictNotFoundException();
    if(req.body.name){
        const disF = await District.findOne({name: req.body.name, status: 1});
        if(disF)throw new DistrictExistenceException();
    }
    if(req.body.idProvince){
        const province = await Province.findOne({_id: req.body.idProvince, status: 1});
        if(!province) throw new ProvinceNotFoundException();
    }
    const updatedDistrict = await District.findByIdAndUpdate(req.params.idDistrict, {
        $set: req.body
    },{
        new: true
    });
    return res.json(updatedDistrict)
}

const findDistrictById = async (req, res) => {
    const district = await District.findOne({_id: req.params.idDistrict, status: 1});
    if(!district){
        throw new DistrictNotFoundException();
    }
    return res.json(district);
};

const deleteAllDistricts = async (req, res) => {
    await District.updateMany({status: 1}, {
        $set: {
            status: 0
        }
    });
    return res.status(204).send();
}

module.exports = {
    createDistrict,
    getAllDistricts,
    deleteDistrict,
    updateDistrict,
    findDistrictById,
    deleteAllDistricts
}