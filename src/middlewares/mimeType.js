const fs = require("fs-extra");

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
        const files = [];
        for(let file in objFiles){
            if(!Array.isArray(objFiles[file])){
                files.push(objFiles[file]);
            }else{
                files.push(...objFiles[file]);
            }
        }
        for(let i = 0; i < files.length; i++){
            if(!mimeTypeConfig.includes(files[i].mimetype.toLowerCase())){
                removeFiles(files);
                next(new MimeTypeException(`El archivo '${files[i].name}' tiene una extensión que no está permitido`));
                return;
            }
        }
        next();
    }
};

const removeFiles = (files) => {
    files?.forEach(f => { fs.remove(f.tempFilePath) });
};

module.exports = {
    mimeType,
    MIME_TYPE_CONFIG
}