const {Schema, model} = require("mongoose");

const ProvinceSchema = new Schema({
    name: String,
    departament: {
        ref: "Departament",
        type: Schema.Types.ObjectId
    },
    status: {
        type: Number,
        default: 1
    }
}, {timestamps: true})

const Province = model("Province", ProvinceSchema);

module.exports = {Province}