const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "newsletters/");
  },
  filename: function (req, file, cb) {
    cb(null, "newsletter" + "-" + Date.now() + path.extname(file.originalname));
  },
});

const limits = {
  fileSize: 10000000, // 10000000 Bytes = 10 MB
};

const upload = multer({
  storage,
  limits,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(csv)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a csv file"));
    }
    cb(undefined, true);
  },
});

module.exports = { upload };
