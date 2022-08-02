const {Schema, model} = require("mongoose");

const UserSchema  = new Schema({
    name: String,
    paternalSurname: String,
    maternalSurname: String,
    birthday: Date,
    username: String,
    password: String,
    email: String,
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
    }
}, {
    timestamps: true
});

const User = model("User", UserSchema);

module.exports = User
