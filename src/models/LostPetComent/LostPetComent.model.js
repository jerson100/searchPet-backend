const {Schema, model} = require("mongoose");

const LostPetCommentSchema = new Schema({
    lostPet: {
      type: Schema.Types.ObjectId,
      ref: "LostPet"
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    description: String,
    locations: [
        {
            type: {
                type: String,
                enum: ["Point"],
                default: "Point"
            },
            coordinates: [Number],
        }
    ],
    status: {
        type: Number,
        default: 1
    }
},{timestamps: true});

const LostPetComment = model("LostPetComment", LostPetCommentSchema);

module.exports = {
    LostPetComment
}