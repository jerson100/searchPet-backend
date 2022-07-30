const mongoose = require("mongoose");

const connectMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Base de datos conectada")
    }catch(e){
        console.log("No se pudo conectar la bd")
    }
}

module.exports = {connectMongoDB}