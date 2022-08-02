const {Departament} = require("../models/Departament/departament.model");
const {
    DepartamentExistenceException,
    DepartamentNotFoundException
} = require("../models/Departament/departament.exception");

const createDepartament = async (req, res) => {
    const dp = await Departament.findOne({
        name: req.body.name,
        status: 1
    });
    if (dp) throw new DepartamentExistenceException();
    const newDepartament = await Departament({
        name: req.body.name
    })
    await newDepartament.save();
    delete newDepartament._doc.status;
    return res.status(201).json(newDepartament);
}

const getAllDepartaments = async (req, res) => {
    const departaments = await Departament.find({status: 1}, {status: 0});
    return res.json(departaments);
};

const deleteDepartament = async (req, res) => {
    const dp = await Departament.findOne({
        _id: req.params.idDepartament,
        status: 1
    });
    if (!dp) throw new DepartamentNotFoundException();
    await Departament.findByIdAndUpdate(req.params.idDepartament, {
        $set: {
            status: 0
        }
    });
    await dp.changeStatus(0);
    return res.status(204).send();
}

const updateDepartament = async (req, res) => {
    const dp = await Departament.findOne({
        _id: req.params.idDepartament,
        status: 1
    });
    if (!dp) throw new DepartamentNotFoundException();
    const findDepartamentEqualName = await Departament.findOne({
        _id: {
            $ne: req.params.idDepartament
        },
        name: req.body.name
    })
    if (findDepartamentEqualName) throw new DepartamentExistenceException();
    const updatedDepartament = await Departament.findByIdAndUpdate(req.params.idDepartament, {
        $set: req.body
    }, {
        new: true
    });
    delete updatedDepartament._doc.status;
    return res.json(updatedDepartament)
}

const findDepartamentById = async (req, res) => {
    const departament = await Departament.findOne({_id: req.params.idDepartament, status: 1}, {status: 0});
    if (!departament) throw new DepartamentNotFoundException();
    return res.json(departament);
};

const deleteAllDepartaments = async (req, res) => {
    await Departament.updateMany({status: 1}, {
        $set: {
            status: 0
        }
    });
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