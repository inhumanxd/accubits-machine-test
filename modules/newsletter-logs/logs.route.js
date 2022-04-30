const router = require("express").Router();
const logs = require("./logs.controller");

const { use } = require("../../helpers/error-handler");

router.get("/", use(logs.getLogs));

module.exports = router;
