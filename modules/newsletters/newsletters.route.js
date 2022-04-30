const router = require("express").Router();
const newsletters = require("./newsletters.controller");

const { use, multerErrorHandler } = require("../../helpers/error-handler");
const { upload } = require("../../helpers/file-upload");

router.post(
  "/",
  upload.single("csv_file"),
  use(newsletters.sendNewsLetter),
  multerErrorHandler
);

module.exports = router;
