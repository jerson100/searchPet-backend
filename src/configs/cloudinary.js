const { v2: cloudinary } = require("cloudinary");

const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
};

const upload = async (filePath, basePath = "sPet/pets") => {
  return await cloudinary.uploader.upload(filePath, {
    folder: basePath,
  });
};

const destroy = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId);
};

const getPublicId = (text) => {
  const groups = /.+\/(.+)\..+$/.exec(text);
  return groups?.length === 2 && groups[1];
};

module.exports = {
  cloudinaryConfig,
  upload,
  destroy,
  getPublicId,
};
