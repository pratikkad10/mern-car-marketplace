import multer from "multer";

// Multer storage (files stored temporarily, then uploaded to Cloudinary)
const storage = multer.diskStorage({});

const upload = multer({ storage });

export default upload;
