const {District} = require("../models/District/disctrict.model");
const {DistrictNotFoundException, DistrictExistenceException
} = require("../models/District/district.exception");
const {Province} = require("../models/Province/province.model");
const {ProvinceNotFoundException} = require("../models/Province/province.exception");

const createDistrict = async (data) => {
    const {province, name} = data;
    const district = await District.findOne({ name: name, status: 1})
    if(district) throw new DistrictExistenceException();
    const provinceObj = await Province.findOne({_id: province, status: 1});
    if(!provinceObj) throw new ProvinceNotFoundException("No existe la provincia para el id especificado", 400);
    const newDistrict = await District({name, province});
    await newDistrict.save();
    delete newDistrict._doc.status;
    return newDistrict;
}

const getAllDistricts = async () => {
    const districts = await District.find({status: 1},{status: 0});
    return districts;
}

const deleteDistrict = async (idDistrict) => {
    const district = await District.findOne({ _id: idDistrict, status: 1})
    if(!district) throw new DistrictNotFoundException();
    await District.findByIdAndUpdate(idDistrict, {
        $set: {
            status: 0
        }
    });
    return district;
}

const updateDistrict = async (idDistrict, data) => {
    const district = await District.findOne({ _id:idDistrict, status: 1})
    if(!district) throw new DistrictNotFoundException();
    if(data.name){
        const disF = await District.findOne({_id: {$ne: idDistrict},name: data.name, status: 1});
        if(disF)throw new DistrictExistenceException();
    }
    if(data.province){
        const province = await Province.findOne({_id: data.province, status: 1});
        if(!province) throw new ProvinceNotFoundException("No existe la provincia para el id especificado", 400);
    }
    const updatedDistrict = await District.findByIdAndUpdate(idDistrict, {
        $set: data
    },{
        new: true
    });
    delete updatedDistrict._doc.status;
    return updatedDistrict;
}

const getOneDistrictById = async (idDistrict) => {
    const district = await District.findOne({_id: idDistrict, status: 1},{ status:0 });
    if(!district) throw new DistrictNotFoundException();
    return district;
}

const deleteAllDistricts = async () => {
    await District.updateMany({status: 1}, {
        $set: {
            status: 0
        }
    });
}

module.exports = {
    createDistrict,
    getAllDistricts,
    deleteDistrict,
    updateDistrict,
    getOneDistrictById,
    deleteAllDistricts
}