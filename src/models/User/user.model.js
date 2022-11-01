const {Schema, model} = require("mongoose");
const {Pet} = require("../Pet/pet.model");

const UserSchema  = new Schema({
    name: String,
    paternalSurname: String,
    maternalSurname: String,
    birthday: Date,
    username: String,
    password: String,
    email: String,
    address: String,
    location: {
        latitud: Number,
        longitud: Number
    },
    district: {
        type: Schema.Types.ObjectId,
        ref: "District"
    },
    socialNetWorks: {
        facebook: String,
        twitter: String,
        instagram: String,
        whatsapp: String
    },
    urlImageProfile: String,
    status: {
        type: Number,
        default: 1
    },
    typeUser: {
        type: String,
        default: "user"
    },
    accountType: {
        type: String,
        enum: ["google", "facebook", "twitter", "instagram", "normal"],
        default: "normal"
    }
}, {
    timestamps: true
});

/*
UserSchema.methods.changeStatus = async function(){
    const { _id : idUser } = this;
    await Pet.findOneAndUpdate(
        {
            user: idUser,
            status: 1
        },
        {
            $set: {
                status: 0
            }
        }
    );
};
*/

const User = model("User", UserSchema);

module.exports = User
