const {Province} = require("../models/Province/province.model");
const {
    ProvinceExistenceException,
    ProvinceNotFoundException, ProvinceUpdateException,
} = require("../models/Province/province.exception");
const {Departament} = require("../models/Departament/departament.model");
const {DepartamentNotFoundException} = require("../models/Departament/departament.exception");

const createProvince = async (data) => {
    const {departament, name} = data;
    const province = await Province.findOne({name: name, status: 1});
    if (province) throw new ProvinceExistenceException();
    const departamentObj = await Departament.findOne({_id: departament, status: 1});
    if (!departamentObj) throw new DepartamentNotFoundException("No existe el departamento especificado", 400);
    const newProvince = await Province({name, departament});
    await newProvince.save();
    delete newProvince._doc.status;
    return newProvince;
}

const getAllProvinces = async () => {
    const provinces = await Province.find({status: 1}, {status: 0});
    return provinces;
}

const deleteProvince = async (idProvince) => {
    const province = await Province.findOne({_id: idProvince, status: 1});
    if (!province) throw new ProvinceNotFoundException();
    await Province.findByIdAndUpdate(idProvince, {
        $set: {
            status: 0
        }
    })
    await province.changeStatus(0);
    return province;
}

const updateProvince = async (idProvince, data) => {
    const province = await Province.findOne({_id: idProvince, status: 1});
    if (!province) throw new ProvinceNotFoundException();
    if (data.name) {
        const ProvinceExists = await Province.findOne({
            _id: {
                $ne: idProvince,
            },
            name: data.name
        })
        if(ProvinceExists) throw new ProvinceExistenceException();
    }
    if(data.departament){
        const departament = await Departament.findOne({ _id: data.departament, status: 1 });
        if(!departament)throw new ProvinceUpdateException("No se actualizó la provincia porque el departamento no existe");
    }
    const updatedProvince = await Province.findByIdAndUpdate(idProvince, {
        $set: req.body
    }, {
        new: true
    });
    delete updatedProvince._doc.status;
    return updatedProvince;
}

const findProvinceById = async (idProvince) => {
    const province = await Province.findOne({_id: idProvince, status: 1},{status:0});
    if(!province) throw new ProvinceNotFoundException();
    return province;
};

const deleteAllProvinces = async () => {
    await Province.updateMany({status: 1}, {
        $set:{
            status: 0
        }
    })
}

module.exports = {createProvince, getAllProvinces, deleteProvince, updateProvince, findProvinceById, deleteAllProvinces}