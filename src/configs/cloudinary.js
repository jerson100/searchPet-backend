const {v2:cloudinary} = require("cloudinary");

const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
}

const upload = async (filePath) => {
    return await cloudinary.uploader.upload(filePath,{
        folder: "sPet/pets"
    });
}

const destroy = async (publicId) => {
    return await cloudinary.uploader.destroy(publicId);
}

module.exports = {
    cloudinaryConfig,
    upload,
    destroy
};