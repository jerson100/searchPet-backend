const {toFileArray, removeFilesFromSystem} = require("../utils/file");

const MIME_TYPE_CONFIG = {
    IMAGES : [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/svg+xml"
    ],
    PDF : [ "application/pdf" ],
    WORD : []
}

class MimeTypeException extends Error{
    constructor(msg="El tipo de archivo no es válido", status= 400) {
        super(msg);
        this.name = "MimeTypeException"
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
                removeFilesFromSystem(files);
                next(new MimeTypeException(`El archivo '${files[i].name}' tiene una extensión que no está permitido`));
                return;
            }
        }
        next();
    }
};

module.exports = {
    mimeType,
    MIME_TYPE_CONFIG
}