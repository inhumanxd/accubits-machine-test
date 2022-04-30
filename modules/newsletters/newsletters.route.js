const router = require("express").Router();
const newsletters = require("./newsletters.controller");
const usersController = require("../users/users.controller");

const { use, multerErrorHandler } = require("../../helpers/error-handler");
const { upload } = require("../../helpers/file-upload");

router.post(
  "/",
  upload.single("csv_file"),
  use(newsletters.sendNewsLetter),
  multerErrorHandler
);

router.post("/subscribe", use(usersController.addUser));

module.exports = router;
