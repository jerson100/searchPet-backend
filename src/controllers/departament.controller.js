const {Departament} = require("../models/Departament/departament.model");

const createDepartament = () => async (req, res) => {
    const newDepartament = await Departament({
        name: req.body.name
    })
    await newDepartament.save();
    return res.status(201).json(newDepartament);
}

const getAllDepartaments = () => async (req, res) => {
    const departaments = await Departament.find();
    return res.json(departaments);
};

module.exports = {createDepartament, getAllDepartaments}