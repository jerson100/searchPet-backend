const {Schema, model} = require("mongoose");
const {District} = require("../District/disctrict.model");
const {Province} = require("../Province/province.model");

const DepartamentSchema = new Schema({
    name: String,
    status: {
        type: Number,
        default: 1
    }
}, {timestamps: true})

/*
DepartamentSchema.methods.changeStatus = async function (status = 0) {
    const idDepartament = this._id;
    const provinces = await Province.find({departament: idDepartament, status: 1});
    const provinceIds = provinces.map(p => p._id);
    await Province.updateMany({
            departament: idDepartament,
            status: 1
        },
        {
            $set: {
                status: status
            }
        })
    if (provinceIds.length > 0) {
        await District.updateMany({province: {$in: provinceIds}, status: 1}, {$set: {status: status}})
    }
}*/

const Departament = model("Departament", DepartamentSchema);

module.exports = {Departament}