const express = require("express");
const loadEnvironmentVariables = require("./environment/environment");
const { errorHandler } = require("./helpers/error-handler");
const establishConnection = require("./config/database");

const app = express();

loadEnvironmentVariables();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routing
app.use("/", require("./routes"));
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const run = async () => {
  app.listen(PORT, async () => {
    console.log(
      `🚀 Server is now running in ${process.env.NODE_ENV} mode. http://localhost:${PORT}/`
    );

    await establishConnection(); //Database connection
  });
};

run().catch((err) => {
  console.error(err);
  //   process.exit(1);
});

process.on("uncaughtException", (error, origin) => {
  console.info(origin);
  console.error(error);
  process.exit(1);
});
