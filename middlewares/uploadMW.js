// uploadMiddleware.js
const multer = require("multer");
const AppError = require("../utils/appError");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    if (file) {
    //   const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.originalname);
    } else {
      cb(null, false);
    }
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const error = new AppError("Upload not supported file type...",404);

      cb(error, false);
    }
  },
});

module.exports = upload;
