const {Schema, model} = require("mongoose");

const UserPetSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    pet: {
        type: Schema.Types.ObjectId,
        ref: "Pet"
    },
    status: {
        type: Number,
        default: 1
    }
}, {timestamps: true})

const UserPet = model("UserPet", UserPetSchema);

module.exports = {UserPet}