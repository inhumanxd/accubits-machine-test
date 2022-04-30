const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Welcome to newsletters dashboard.");
});

// API routes
router.use("/api", require("./modules/routes"));

module.exports = router;
