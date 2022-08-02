const {Province} = require("../models/Province/province.model");
const {
    ProvinceExistenceException,
    ProvinceNotFoundException, ProvinceUpdateException,
} = require("../models/Province/province.exception");
const {Departament} = require("../models/Departament/departament.model");
const {DepartamentNotFoundException} = require("../models/Departament/departament.exception");

const createProvince = async (req, res) => {
    const {departament, name} = req.body;
    const province = await Province.findOne({name: name, status: 1});
    if (province) throw new ProvinceExistenceException();
    const departamentObj = await Departament.findOne({_id: departament, status: 1});
    if (!departamentObj) throw new DepartamentNotFoundException("No existe el departamento especificado");
    const newProvince = await Province({name, departament});
    await newProvince.save();
    delete newProvince._doc.status;
    return res.status(201).json(newProvince);
}

const getAllProvinces = async (req, res) => {
    const provinces = await Province.find({status: 1}, {status: 0});
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
    await province.changeStatus(0)
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
    if(req.body.departament){
        const departament = await Departament.findOne({ _id: req.body.departament, status: 1 });
        if(!departament)throw new ProvinceUpdateException("No actualizó la provincia porque el departamento no existe");
    }
    const updatedProvince = await Province.findByIdAndUpdate(req.params.idProvince, {
        $set: req.body
    }, {
        new: true
    });
    delete updatedProvince._doc.status;
    return res.json(updatedProvince)
}

const findProvinceById = async (req, res) => {
    const province = await Province.findOne({_id: req.params.idProvince, status: 1},{status:0});
    if(!province) throw new ProvinceNotFoundException();
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