const fs = require("fs-extra");

const removeFilesFromSystem = (files) => {
    files?.forEach(f => {
        try{
            fs.remove(f.tempFilePath)
        }catch(e){}
    });
}

const removeFilesFromObject = (objFiles) => {
    if(!objFiles) return;
    const files = toFileArray(objFiles);
    removeFilesFromSystem(files);
}

/*
* {
*   img: {}
* }
*
* {
*   img: [
*       {},
*       {}
*   ]
* }
* */
const toFileArray = (objFiles={}) => {
    const files = [];
    for(let file in objFiles){
        if(!Array.isArray(objFiles[file])){
            files.push(objFiles[file]);
        }else{
            files.push(...objFiles[file]);
        }
    }
    return files;
}

module.exports = {
    removeFilesFromObject,
    removeFilesFromSystem,
    toFileArray
}