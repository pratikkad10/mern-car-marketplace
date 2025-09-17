import cloudinary from "../config/cloudinary.js"; // already v2

const uploadToCloudinary = (filePath, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload( // no .v2 here
      filePath,
      { folder },
      (error, result) => {
        if (error) return reject(error);
        console.log("✅ Cloudinary upload success:", result.secure_url);
        resolve(result);
      }
    );
  });
};

export default uploadToCloudinary;
