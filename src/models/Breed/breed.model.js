const {Schema, model} = require("mongoose");

const BreedSchema = new Schema({
    typePet: {
        type: Schema.Types.ObjectId,
        ref:"TypePet"
    },
    name: String,
    description: String,
    characteristics: {},
    images: [String],
    status: {
        type: Number,
        default: 1
    },
}, {timestamps: true})

const Breed = model("Breed", BreedSchema);

module.exports = {Breed}