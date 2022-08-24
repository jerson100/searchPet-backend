const {TypePet} = require("../models/TypePet/typePet.model");
const {ExistsTypePetException, NotFoundTypePetException} = require("../models/TypePet/typePet.exception");

const all = async () => {
  const typePets=  await TypePet.find({status:1},{status:0});
  return typePets;
};

const create = async (data) => {
    const tpet = await TypePet.findOne({type: data.type, status: 1});
    if(tpet) throw new ExistsTypePetException();
    const typeUser = await new TypePet(data);
    await typeUser.save();
    delete typeUser._doc.status;
    return typeUser;
}

const findById = async (id) => {
    const typePet = await TypePet.findOne({_id:id, status:1},{status:0});
    if(!typePet) throw new NotFoundTypePetException();
    return typePet;
}

const update = async (id, data) => {
    const typePet = await TypePet.findOne({_id:id, status: 1});
    if(!typePet) throw new NotFoundTypePetException();
    const t = await TypePet.findOneAndUpdate(
        {_id: id},
        {$set: data},
        {new:true}
    );
    delete t._doc.status;
    return t;
};

const deleteOne = async (id) => {
    const typePet = await TypePet.findOne({_id:id, status: 1});
    if(!typePet) throw new NotFoundTypePetException();
    await TypePet.updateOne({_id:id},{
        $set:{
            status:0
        }
    })
    return;
};

const deleteAll  = async () => {
    await TypePet.updateMany({},{
        $set:{
            status: 0
        }
    })
    return;
}

module.exports = {
    create,
    findById,
    update,
    deleteOne,
    deleteAll,
    all
}