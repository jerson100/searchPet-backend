const {Departament} = require("../models/Departament/departament.model");

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
    console.log(deletedDepartament)
    //comprobamos si se realizö la actualización para enviar una respuesta u otra
    return res.send();
}

module.exports = {createDepartament, getAllDepartaments, deleteDepartament}