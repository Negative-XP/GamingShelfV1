const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") { //checks if file type is supported and if not it throws an error
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
