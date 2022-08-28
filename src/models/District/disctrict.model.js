const {Schema, model} = require("mongoose");

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

DistrictSchema.statics.existsDistrict = async function(idDistrict){
    if(idDistrict){
        const district = await model("District").findOne({_id: idDistrict, status: 1})
            .populate({
                path: "province",
                populate: {
                    path: "departament"
                }
            })
        if(!district?.status || !district?.province?.status || !district?.province?.departament?.status){
            return null;
        }
        return district;
    }
    return null;
}

const District = model("District", DistrictSchema);

module.exports = {District}