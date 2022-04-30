const dotenv = require("dotenv");

const loadEnvironmentVariables = () => {
  configPath =
    process.env.NODE_ENV == "development"
      ? __dirname + "/development.env"
      : __dirname + "/production.env";

  dotenv.config({ path: configPath });
};

module.exports = loadEnvironmentVariables;
