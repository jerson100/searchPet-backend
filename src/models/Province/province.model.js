const {Schema, model} = require("mongoose");

const ProvinceSchema = new Schema({
    name: String,
    idDepartament: {
        ref: "Departament",
        type: Schema.Types.ObjectId
    },
    status: Number
}, {timestamps: true})

const Province = model("Province", ProvinceSchema);

module.exports = {Province}