const router = require("express").Router();
const usersController = require("./users.controller");

const { use } = require("../../helpers/error-handler");

router.get("/", use(usersController.getUsers));

router.post("/", use(usersController.addUser));

module.exports = router;
