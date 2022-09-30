const express = require("express");
const {connectMongoDB} = require("./configs/mongodb");
const logger = require("morgan");
if(process.env.TYPE!=="PRODUCTION"){
    require("dotenv").config();
}
const cloudinary = require("cloudinary");
const cors = require("cors");
const app = express();
const UserRouterV1 = require("./v1/routers/Users.router");
const DepartamentRouterV1 = require("./v1/routers/departament.router");
const ProvinceRouterV1 = require("./v1/routers/province.router");
const DistrictRouterV1 = require("./v1/routers/district.router");
const AuthRouterV1 = require("./v1/routers/auth.router");
const TypePetRouterV1 = require("./v1/routers/typePet.router");
const BreedRouterV1 = require("./v1/routers/breed.router");
const PetRouterV1 = require("./v1/routers/pet.router");
const {cloudinaryConfig} = require("./configs/cloudinary");
const LostPetRouterV1 = require("./v1/routers/lostPet.router");
const {removeFilesFromObject} = require("./utils/file");

cloudinary.v2.config(cloudinaryConfig);

connectMongoDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger("dev"));

app.use(`/api/v1/users`, UserRouterV1);
app.use(`/api/v1/departaments`, DepartamentRouterV1);
app.use(`/api/v1/provinces`, ProvinceRouterV1);
app.use(`/api/v1/districts`, DistrictRouterV1);
app.use(`/api/v1/auth`, AuthRouterV1);
app.use(`/api/v1/typePets`, TypePetRouterV1);
app.use(`/api/v1/breeds`, BreedRouterV1);
app.use(`/api/v1/pets`, PetRouterV1);
app.use(`/api/v1/lostpet`, LostPetRouterV1);

app.listen(process.env.PORT, () => {
    console.log(`El servidor está escuchando en el puerto ${process.env.PORT}`)
});

app.use((error, req, res, next) => {
    // console.log(error)
    // Eliminamos archivos temporales
    removeFilesFromObject(req.files);
    if (!error.status) {
        if (process.env.TYPE === "DEVELOPMENT") {
            res.status(500).json({
                message: "Ocurrió un error en el servidor",
                stack: error.stack,
            });
        } else {
            //console.log(error);
            res.status(500).json({
                message: "Ocurrió un error en el servidor",
            });
        }
    } else {
        res.status(error.status).json({message: error.message});
    }
});