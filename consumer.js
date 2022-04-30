const express = require("express");
const loadEnvironmentVariables = require("./environment/environment");
const establishConnection = require("./config/database");
const { consumeJob } = require("./helpers/rabbitmq");

const app = express();

loadEnvironmentVariables();

const RABBITMQ_QUEUE = process.env.RABBITMQ_QUEUE;
const parkingLotQueue = process.env.RABBITMQ_SECONDARY_QUEUE;

consumeJob(RABBITMQ_QUEUE);
// consumeJob(parkingLotQueue);

app.use((err, req, res, next) => {
  console.error(err);
  res.send(err.message);
});

const PORT = process.env.SMTP_SERVICE_PORT || 3001;
const run = async () => {
  app.listen(PORT, async () => {
    console.log(
      `🚀 Consumer Server is now running in ${process.env.NODE_ENV} mode. http://localhost:${PORT}/`
    );

    // Connect to the database
    await establishConnection();
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
