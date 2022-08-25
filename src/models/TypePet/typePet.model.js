const {
    Schema, model
} = require("mongoose");
const {Breed} = require("../Breed/breed.model");

const TypePetSchema = new Schema({
    type: String,
    status: {
        type: Number,
        default: 1
    },
    description: String,
}, {timestamps: true})

TypePetSchema.methods.changeBreedStatus = async function (newStatus= 0){
    const idTypePet = this._id;
    await Breed.updateMany({
        typePet: idTypePet,
        status: 1
    },{
        $set: {
            status: newStatus
        }
    });
};

TypePetSchema.statics.changeBreedStatus = async function (newStatus = 0) {
  await Breed.updateMany({status: 1},{
      $set: {
          status: newStatus
      }
  })
}

const TypePet = model("TypePet", TypePetSchema);

module.exports = {
    TypePet
}