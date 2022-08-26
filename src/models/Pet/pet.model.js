const {Schema, model} = require("mongoose");

const PetSchema  = new Schema({
   name: String,
   user: {
      type: Schema.Types.ObjectId,
      ref:"User",
   },
   breed: {
      type: Schema.Types.ObjectId,
      ref: "Breed",
   },
   urlImageProfile: String,
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