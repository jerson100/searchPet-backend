const {Province} = require("../models/Province/province.model");
const {
    ProvinceExistenceException,
    ProvinceNotFoundException, ProvinceUpdateException, ProvinceCreationException,
} = require("../models/Province/province.exception");
const {Departament} = require("../models/Departament/departament.model");

const createProvince = async (data) => {
    const {departament, name} = data;
    const departamentObj = await Departament.findOne({_id: departament, status: 1});
    if (!departamentObj) throw new ProvinceCreationException("No se pudo crear la provincia porque no existe el departamento");
    const province = await Province.findOne({name, departament, status: 1});
    if (province) throw new ProvinceExistenceException("Ya existe la provincia para el departamento especificado");
    const newProvince = await Province({name, departament});
    await newProvince.save();
    delete newProvince._doc.status;
    return newProvince;
}

const getAllProvinces = async () => {
    let provinces = await Province.find({status: 1}, {status: 0}).populate("departament");
    return provinces
        .filter(p => !!p.departament?.status)
        .map(p => {
            const id = p._doc.departament._id;
            delete p._doc.departament;
            return {...p._doc, departament: id};
        });
}

const deleteProvince = async (idProvince) => {
    const p = await Province.findOneAndUpdate({
        _id: idProvince,
        status: 1
    },{
        $set: {
            status: 0
        }
    }).populate("departament");
    if (!p || !p._doc.departament?.status) throw new ProvinceNotFoundException();
}

const updateProvince = async (idProvince, data) => {
    const province = await Province.existsProvince(idProvince);
    if (!province) throw new ProvinceNotFoundException();
    if(data.departament){
        const departament = await Departament.findOne({ _id: data.departament, status: 1 });
        if(!departament)throw new ProvinceUpdateException("No se actualizó la provincia porque el departamento no existe");
    }
    if (data.name) {
        const query = {
            _id: {
                $ne: idProvince,
            },
            name: data.name,
            status: 1,
            departament: data.departament || province.departament._doc._id
        }
        const ProvinceExists = await Province.findOne(query);
        console.log(ProvinceExists)
        console.log(data)
        if(ProvinceExists) throw new ProvinceExistenceException("Ya existe una provincia con el mismo nombre para el departamento");
    }
    const updatedProvince = await Province.findOneAndUpdate({_id:idProvince}, {
        $set: data
    }, {
        new: true
    });
    delete updatedProvince._doc.status;
    return updatedProvince;
}

const findProvinceById = async (idProvince) => {
    const province = await Province.existsProvince(idProvince);
    if(!province) throw new ProvinceNotFoundException();
    const id = province._doc.departament._id;
    delete province._doc.departament;
    delete province._doc.status;
    return {...province._doc, departament: id};
};

const deleteAllProvinces = async () => {
    await Province.updateMany({status: 1}, {
        $set:{
            status: 0
        }
    })
}

module.exports = {createProvince, getAllProvinces, deleteProvince, updateProvince, findProvinceById, deleteAllProvinces}