const {Schema, model} = require("mongoose");
const {User} = require("../User/user.model");

const DistrictSchema = new Schema({
    name: String,
    province: {
        type: Schema.Types.ObjectId,
        ref: "Province"
    },
    status: {
        type: Number,
        default: 1
    },
}, {timestamps: true})

const District = model("District", DistrictSchema);

module.exports = {District}