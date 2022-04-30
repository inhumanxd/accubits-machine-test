const router = require("express").Router();

router.use("/users", require("./users/users.route"));
router.use("/newsletters", require("./newsletters/newsletters.route"));
router.use("/logs", require("./newsletter-logs/logs.route"));

module.exports = router;
