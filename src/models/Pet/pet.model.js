const {Schema, model} = require("mongoose");

const PetSchema  = new Schema({
   name: String,
   Breed: {
      type: Schema.Types.ObjectId,
      ref: "Breed",
   },
   imageProfile: String,
   description: String,
   images: [String],
   dateOfBirth: Date,
   characteristics: {
      size:  String,
      eyeColor: String,
      hairColor: String
   },
   status: {
      type: Number,
      default: 1
   },
},{timestamps: true});

const Pet = model("Pet", PetSchema);

module.exports = {
   Pet
}