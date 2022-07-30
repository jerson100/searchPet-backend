const express = require("express");
const {connectMongoDB} = require("./configs/mongodb");
const logger = require("morgan");
require("dotenv").config();
const cors = require("cors");
const app = express();
const UserRouter = require("./routers/Users.router");
const DepartamentRouter = require("./routers/departament.router");
const ProvinceRouter = require("./routers/province.router");
const DistrictRouter = require("./routers/district.router");

connectMongoDB();

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

app.use(`/api/${process.env.API_VERSION}/users`, UserRouter);
app.use(`/api/${process.env.API_VERSION}/departaments`, DepartamentRouter);
app.use(`/api/${process.env.API_VERSION}/provinces`, ProvinceRouter);
app.use(`/api/${process.env.API_VERSION}/districts`, DistrictRouter);

app.listen(process.env.PORT, () => {
    console.log(`El servidor está escuchando en el puerto ${process.env.PORT}`)
});

app.use((error, req, res, next) => {
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