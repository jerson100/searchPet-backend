const {Schema, model} = require("mongoose");

const UserSchema  = new Schema({
    name: String,
    paternalSurname: String,
    maternalSurname: String,
    birthday: Date,
    username: String,
    password: String,
    idDistrict: {
        type: Schema.Types.ObjectId,
        ref: "District"
    },
    socialNetWorks: {
        facebook: String,
        twitter: String,
        instagram: String,
        whatsapp: String
    },
    urlImageProfile: String
}, {
    timestamps: true
});

const User = model("User", UserSchema);

module.exports = User
