const fileUploadConfig = {
    useTempFiles: true,//vamos a almacenarlo en un archivo temporal por mientras para luego enviarselo a cloudinary u otro servicio.
    limits: {
        fileSize: 50 * 1024 * 1024,
        files: 1
    },
    tempFileDir: "./src/uploads"
}

module.exports = {
    fileUploadConfig
}