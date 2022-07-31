const {Departament} = require("../models/Departament/departament.model");
const {District} = require("../models/District/disctrict.model");

const createDepartament = async (req, res) => {
    const newDepartament = await Departament({
        name: req.body.name
    })
    await newDepartament.save();
    return res.status(201).json(newDepartament);
}

const getAllDepartaments = async (req, res) => {
    const departaments = await Departament.find();
    return res.json(departaments);
};

const deleteDepartament = async (req, res) => {
    const deletedDepartament = await Departament.findByIdAndUpdate(req.params.idDepartament, {
        $set: {
            status: 0
        }
    });
    //comprobamos si se realizö la actualización para enviar una respuesta u otra
    return res.send();
}

const updateDepartament = async (req, res) => {
    const updatedDepartament = await Departament.findByIdAndUpdate(req.params.idDepartament, {
        $set: req.body
    },{
        new: true
    });
    return res.json(updatedDepartament)
}

const findDepartamentById = async (req, res) => {
    const departament = await Departament.findById(req.params.idDepartament);
    return res.json(departament);
};

const deleteAllDepartaments = async (req, res) => {
    const deletedDepartaments = await Departament.deleteMany();
    return res.send();
}

module.exports = {
    createDepartament,
    getAllDepartaments,
    deleteDepartament,
    updateDepartament,
    findDepartamentById,
    deleteAllDepartaments
}