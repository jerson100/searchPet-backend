const {
    Schema, model
} = require("mongoose");

const TypePetSchema = new Schema({
    type: String,
    status: {
        type: Number,
        default: 1
    },
}, {timestamps: true})

const TypePet = model("TypePet", TypePetSchema);

module.exports = {
    TypePet
}