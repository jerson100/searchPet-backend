const {Schema, model} = require("mongoose");

const DepartamentSchema = new Schema({
    name: String,
    status: {
        type: Number,
        default: 1
    }
}, {timestamps: true})

const Departament = model("Departament", DepartamentSchema);

module.exports = {Departament}