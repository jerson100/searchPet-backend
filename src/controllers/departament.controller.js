const DepartamentService = require("../services/departamentService");

const createDepartament = async (req, res) => {
    const newDepartament = await DepartamentService.createDepartament(req.body.name)
    return res.status(201).json(newDepartament);
}

const getAllDepartaments = async (req, res) => {
    const departaments = await DepartamentService.getAllDepartaments()
    return res.json(departaments);
};

const deleteDepartament = async (req, res) => {
    await DepartamentService.deleteDepartament(req.params.idDepartament);
    return res.status(204).send();
}

const updateDepartament = async (req, res) => {
    const dp = await DepartamentService.updateDepartament(req.params.idDepartament, req.body)
    return res.json(dp);
}

const findDepartamentById = async (req, res) => {
    const departament = await DepartamentService.findDepartamentById(req.params.idDepartament);
    return res.json(departament);
};

const deleteAllDepartaments = async (req, res) => {
    await DepartamentService.deleteAllDepartaments();
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