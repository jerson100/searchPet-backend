const {Departament} = require("../models/Departament/departament.model");
const {
    DepartamentExistenceException,
    DepartamentNotFoundException
} = require("../models/Departament/departament.exception");

const createDepartament = async (name) => {
    const dp = await Departament.findOne({
        name: name,
        status: 1
    });
    if (dp) throw new DepartamentExistenceException();
    const newDepartament = await Departament({
        name: name
    })
    await newDepartament.save();
    delete newDepartament._doc.status;
    return newDepartament;
}

const getAllDepartaments = async () => {
    const departaments = await Departament.find({status: 1}, {status: 0});
    return departaments;
};

const deleteDepartament = async (idDepartament) => {
    const dp = await Departament.findOne({
        _id: idDepartament,
        status: 1
    });
    if (!dp) throw new DepartamentNotFoundException();
    await Departament.findByIdAndUpdate(idDepartament, {
        $set: {
            status: 0
        }
    });
    await dp.changeStatus(0);
}

const updateDepartament = async (idDepartament, data) => {
    const dp = await Departament.findOne({
        _id: idDepartament,
        status: 1
    });
    if (!dp) throw new DepartamentNotFoundException();
    const findDepartamentEqualName = await Departament.findOne({
        _id: {
            $ne: idDepartament
        },
        name: data.name
    })
    if (findDepartamentEqualName) throw new DepartamentExistenceException();
    const updatedDepartament = await Departament.findByIdAndUpdate(idDepartament, {
        $set: data
    }, {
        new: true
    });
    delete updatedDepartament._doc.status;
    return updatedDepartament;
}

const findDepartamentById = async (idDepartament) => {
    const departament = await Departament.findOne({_id: idDepartament, status: 1}, {status: 0});
    if (!departament) throw new DepartamentNotFoundException();
    return departament;
};

const deleteAllDepartaments = async () => {
    await Departament.updateMany({status: 1}, {
        $set: {
            status: 0
        }
    });
}

module.exports = {
    createDepartament,
    getAllDepartaments,
    deleteDepartament,
    updateDepartament,
    findDepartamentById,
    deleteAllDepartaments
}