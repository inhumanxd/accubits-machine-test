const mongoose = require("mongoose");

const connect = async () => {
  if (process.env.NODE_ENV === "development") mongoose.set("debug", true);

  mongoose.connect(`${process.env.MONGO_URI}/${process.env.MONGO_DB}`);
  const connection = mongoose.connection;

  connection.on("open", () => {
    console.log(`💾 Connected to database: ${connection.name} successfully!`);
  });

  connection.on("error", (error) => {
    console.error(error);
    process.exit(1);
  });
};

module.exports = connect;
