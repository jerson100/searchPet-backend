const {Schema, model} = require("mongoose");

const LostPetSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    pets: [
        {
            type: Schema.Types.ObjectId,
            ref: "Pet"
        }
    ],
    images: [String],
    location: {
        latitude: Number,
        longitude : Number
    },
    description: String,
    located: {
      type: Boolean,
      default: false
    },
    status: {
        type: Number,
        default: 1
    }
}, {timestamps:true})

const LostPet = model("LostPet", LostPetSchema);

module.exports = {
    LostPet
}