const fileUpload = require("express-fileupload");
const {toFileArray} = require("../utils/file");

class FileError extends Error {
    constructor(msg="Ocurrió un error al leer un archivo", status= 400) {
        super(msg);
        this.name = "FileError";
        this.status = status;
    }
}

const mimeType = (mimeTypeConfig) => {
    return (req, res, next) => {
        if(!mimeTypeConfig || !req.files) {
            next();
            return;
        };
        const objFiles = req.files;
        const files = toFileArray(objFiles);
        for(let i = 0; i < files.length; i++){
            if(!mimeTypeConfig.includes(files[i].mimetype.toLowerCase())){
                next(new FileError(`El archivo '${files[i].name}' tiene una extensión que no está permitido`));
                return;
            }
        }
        next();
    }
};

const validateRequestImageFiles = (requestPropertyName) => (req, res, next) => {
    const { files } = req;
    if(requestPropertyName && (!files || (files && !files[requestPropertyName]))){
        next(new FileError(`${requestPropertyName} is required`));
    }else{
        next();
    }
};


const validateFile = (options = {}, mimeTypeConfig, requestPropertyName) => {
    const calls = [
        fileUpload(
            {
                tempFileDir: "./src/uploads/temp",
                useTempFiles: true,
                abortOnLimit: true,
                ...options
            }
        ),
        validateRequestImageFiles(requestPropertyName),
        mimeType(mimeTypeConfig)
    ];
    return calls;
}


module.exports = {
    validateFile,

}