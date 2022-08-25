const BreedService = require("../services/breedService");

const getAll = async (req, res) => {
    const breeds = await BreedService.getAll();
    return res.json(breeds);
}

const findById = async (req, res) => {
    const breed = await BreedService.findById(req.params.idBreed);
    return res.json(breed);
}

const update = async (req, res) => {
    const breedUpdated = await BreedService.update(req.params.idBreed, req.body);
    return res.json(breedUpdated);
}

const create = async (req, res) => {
    const newB= await BreedService.create(req.body);
    return res.status(201).json(newB);
};

const deleteOne = async (req, res) => {
    await BreedService.deleteOne(req.params.idBreed);
    return res.status(204).send();
}

const deleteAll = async (req, res) => {
    await BreedService.deleteAll();
    return res.status(204).send();
}

module.exports = {
    getAll,
    findById,
    create,
    deleteAll,
    deleteOne,
    update
}