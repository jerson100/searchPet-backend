const {Departament} = require("../models/Departament/departament.model");
const {DepartamentExistenceException, DepartamentNotFoundException} = require("../models/Departament/departament.exception");

const createDepartament = async (req, res) => {
    const dp = await Departament.findOne({
        name: req.body.name,
        status: 1
    });
    if(dp) throw new DepartamentExistenceException();
    const newDepartament = await Departament({
        name: req.body.name
    })
    await newDepartament.save();
    return res.status(201).json(newDepartament);
}

const getAllDepartaments = async (req, res) => {
    const departaments = await Departament.find({status: 1});
    return res.json(departaments);
};

const deleteDepartament = async (req, res) => {
    const dp = await Departament.findOne({
        _id: req.params.idDepartament,
        status: 1
    });
    if(!dp) throw new DepartamentNotFoundException();
    await Departament.findByIdAndUpdate(req.params.idDepartament, {
        $set: {
            status: 0
        }
    });
    //comprobamos si se realizö la actualización para enviar una respuesta u otra
    return res.status(204).send();
}

const updateDepartament = async (req, res) => {
    const dp = await Departament.findOne({
        _id: req.params.idDepartament,
        status: 1
    });
    if(!dp) throw new DepartamentNotFoundException();
    const findDepartamentEqualName = await Departament.findOne({
        _id: {
            $ne: req.params.idDepartament
        },
        name: req.body.name
    })
    if(findDepartamentEqualName) throw new DepartamentExistenceException();
    const updatedDepartament = await Departament.findByIdAndUpdate(req.params.idDepartament, {
        $set: req.body
    },{
        new: true
    });
    return res.json(updatedDepartament)
}

const findDepartamentById = async (req, res) => {
    const departament = await Departament.findOne({_id: req.params.idDepartament, status: 1});
    if(!departament)  throw new DepartamentNotFoundException();
    return res.json(departament);
};

const deleteAllDepartaments = async (req, res) => {
    await Departament.deleteMany({status: 1});
    return res.status(204).send();
}

module.exports = {
    createDepartament,
    getAllDepartaments,
    deleteDepartament,
    updateDepartament,
    findDepartamentById,
    deleteAllDepartaments
}