const {Province} = require("../models/Province/province.model");
const {
    ProvinceExistenceException,
    ProvinceNotFoundException, ProvinceUpdateException,
} = require("../models/Province/province.exception");
const {Departament} = require("../models/Departament/departament.model");
const {DepartamentNotFoundException} = require("../models/Departament/departament.exception");

const createProvince = async (req, res) => {
    const {idDepartament, name} = req.body;
    const province = await Province.findOne({name: name, status: 1});
    if (province) throw new ProvinceExistenceException();
    const departament = await Departament.findOne({_id: idDepartament, status: 1});
    if (!departament) throw new DepartamentNotFoundException("No existe el departamento para el idDepartament");
    const newProvince = await Province({name, idDepartament});
    await newProvince.save();
    return res.status(201).json(newProvince);
}

const getAllProvinces = async (req, res) => {
    const provinces = await Province.find({status: 1});
    return res.json(provinces);
}

const deleteProvince = async (req, res) => {
    const province = await Province.findOne({_id: req.params.idProvince, status: 1});
    if (!province) throw new ProvinceNotFoundException();
    await Province.findByIdAndUpdate(req.params.idProvince, {
        $set: {
            status: 0
        }
    })
    return res.status(204).send();
}

const updateProvince = async (req, res) => {
    const province = await Province.findOne({_id: req.params.idProvince, status: 1});
    if (!province) throw new ProvinceNotFoundException();
    if (req.body.name) {
        const ProvinceExists = await Province.findOne({
            _id: {
                $ne: req.params.idProvince,
            },
            name: req.body.name
        })
        if(ProvinceExists) throw new ProvinceExistenceException();
    }
    if(req.body.idDepartament){
        const departament = await Departament.findOne({ _id: req.body.idDepartament, status: 1 });
        console.log(req.body)
        if(!departament){
            throw new ProvinceUpdateException("No actualizó la provincia porque el departamento no existe");
        }
    }
    const updatedProvince = await Province.findByIdAndUpdate(req.params.idProvince, {
        $set: req.body
    }, {
        new: true
    });
    return res.json(updatedProvince)
}

const findProvinceById = async (req, res) => {
    const province = await Province.findOne({_id: req.params.idProvince, status: 1});
    if(!province){
        throw new ProvinceNotFoundException();
    }
    return res.json(province);
};

const deleteAllProvinces = async (req, res) => {
    await Province.updateMany({status: 1}, {
        $set:{
            status: 0
        }
    })
    return res.status(204).send();
}

module.exports = {createProvince, getAllProvinces, deleteProvince, updateProvince, findProvinceById, deleteAllProvinces}