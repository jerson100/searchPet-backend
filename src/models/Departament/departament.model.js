const {Schema, model} = require("mongoose");

const DepartamentSchema = new Schema({
    name: String,
    status: Number
}, {timestamps: true})

const Departament = model("Departament", DepartamentSchema);

module.exports = {Departament}