const TypePetService = require("../services/typePetService");
const {User: UserC} = require("../utils/consts");

const all = async  (req, res) => {
    const typePets = await TypePetService.all();
    return res.json(typePets);
}

const create = async (req, res)=>{
    const typePet = await TypePetService.create(req.body);
    return res.status(201).json(typePet);
};

const findById = async (req, res)=>{
    const {idTypePet} = req.params;
    const typePet = await TypePetService.findById(idTypePet);
    return res.json(typePet);
};

const update = async (req, res)=>{
    const data = req.body;
    const {idTypePet} = req.params;
    const typePet = await TypePetService.update(idTypePet, data);
    return res.json(typePet);
};

const deleteOne = async (req, res)=>{
    const {idTypePet} = req.params;
    await TypePetService.deleteOne(idTypePet);
    return res.status(204).send();
};

const deleteAll = async (req, res)=>{
    await TypePetService.deleteAll();
    return res.status(204).send();
};

module.exports = {
    create,
    findById,
    update,
    deleteOne,
    deleteAll,
    all
}