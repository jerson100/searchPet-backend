const {Breed} = require("../models/Breed/breed.model");
const {ExistsBreedException, CreateBreedException, NotFoundBreedException} = require("../models/Breed/breed.exception");
const {TypePet} = require("../models/TypePet/typePet.model");

const getAll = async () => {
    const breeds = await Breed.find({status: 1}, {status:0});
    return breeds;
};

const create = async ({typePet, name, ...rest}) => {
    const b = await TypePet.findOne({_id: typePet, status: 1});
    if(!b) throw new CreateBreedException("El tipo de mascota especificado no existe");
    const breed = await Breed.findOne({typePet, name, status:1});
    if(breed) throw new ExistsBreedException();
    const newBreed = await new Breed({typePet, name, ...rest});
    await newBreed.save();
    delete newBreed._doc.status;
    return newBreed;
}

const update = async (idBreed, data) => {
    const breed = await Breed.findOne({_id: idBreed, status:1});
    if(!breed) throw new NotFoundBreedException();
    if(data.typePet){
        const b = await TypePet.findOne({_id: data.typePet, status: 1});
        if(!b) throw new CreateBreedException("El tipo de mascota especificado no existe");
    }
    if(data.typePet || data.name){
        const query = { _id: { $ne: idBreed }, status: 1 }
        if(data.typePet) query.typePet = data.typePet;
        if(data.name) query.name = data.name;
        const breedExists = await Breed.findOne(query);
        if(breedExists) throw new ExistsBreedException();
    }
    const breedUpdated = await Breed.findOneAndUpdate(
        { _id: idBreed },
        { $set: data },
        { new: true }
    );
    delete breedUpdated._doc.status;
    return breedUpdated;
};

const findById = async (idBreed) => {
    const breed = await Breed.findOne({_id: idBreed, status: 1},{status:0});
    if(!breed) throw new NotFoundBreedException();
    return breed;
};

const deleteOne = async (idBreed) => {
    const breed = await Breed.findOneAndUpdate(
        { _id: idBreed, status: 1 },
        {  $set:{  status: 0 } }
    );
    if(!breed) throw new NotFoundBreedException();
}

const deleteAll = async () => {
  await Breed.updateMany({ status: 1 },{
      $set: { status: 0 }
  })
};

module.exports = {
    getAll,
    create,
    update,
    findById,
    deleteOne,
    deleteAll
}