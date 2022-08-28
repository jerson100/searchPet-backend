const {District} = require("../models/District/disctrict.model");
const {DistrictNotFoundException, DistrictExistenceException, DistrictCreationException, DistrictUpdateException
} = require("../models/District/district.exception");
const {Province} = require("../models/Province/province.model");

const createDistrict = async (data) => {
    const {province, name} = data;
    const existsProvince = await Province.existsProvince(province);
    if(!existsProvince) throw new DistrictCreationException("No se pudo crear el distrito porque no existe la provincia");
    const district = await District.findOne({ name, province, status: 1});
    if(district) {
        throw new DistrictExistenceException("Ya existe un distrito con el mismo nombre que pertenece a la mis provincia del departamento");
    }
    const newDistrict = await District({name, province});
    await newDistrict.save();
    delete newDistrict._doc.status;
    return newDistrict;
}

const getAllDistricts = async () => {
    let districts = await District.find({status: 1},{status: 0}).populate({
        path: "province",
        populate: {
            path: "departament"
        }
    });
    return districts
        .filter(d => d.province?.status && d.province?.departament?.status)
        .map(d=>{
            const idP = d._doc.province._id;
            delete d._doc.province;
            delete d._doc.status;
            return {
                ...d._doc,
                province: idP
            };
        })
}

const deleteDistrict = async (idDistrict) => {
    const existsDistrict = await District.existsDistrict(idDistrict);
    if(!existsDistrict) throw new DistrictNotFoundException();
    const district = await District.findOneAndUpdate(
        {
            _id: idDistrict,
            status: 1
        },
        {
            $set: {
                status: 0
            }
        })
    if(!district) throw new DistrictNotFoundException();
}

const updateDistrict = async (idDistrict, data) => {
    const district = await District.existsDistrict(idDistrict);
    if(!district) throw new DistrictNotFoundException();
    if(data.province){
        const province = await Province.existsProvince(data.province);
        if(!province) throw new DistrictUpdateException("No se pudo actualizar el distrito porque no existe la provincia especificada");
    }
    if(data.name){
        const query = {
            _id: {$ne: idDistrict},
            name: data.name,
            status: 1,
            province: data.province || district._doc.province._id
        }
        const disF = await District.findOne(query);
        if(disF)throw new DistrictExistenceException();
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
    const district = await District.existsDistrict(idDistrict);
    if(!district) throw new DistrictNotFoundException();
    delete district._doc.province;
    delete district._doc.status;
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