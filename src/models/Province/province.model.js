const {Schema, model} = require("mongoose");
const {District} = require("../District/disctrict.model");

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

ProvinceSchema.statics.existsProvince = async (idProvince) => {
    if(idProvince){
        const province = await model("Province").findOne({_id: idProvince, status:  1})
            .populate("departament");
        if(!province?.status || !province?.departament?.status){
            return null;
        }
        return province;
    }
    return null;
};

/*
ProvinceSchema.methods.changeStatus = async function (status = 0) {
    const idProvince = this._id;
    await District.updateMany({
        province: idProvince
    }, {
        $set: {
            status: status
        }
    })
    return this;
};
*/
const Province = model("Province", ProvinceSchema);

module.exports = {Province}