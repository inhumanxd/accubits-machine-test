const logsService = require("./logs.service");

const getLogs = async (req, res) => {
  const logs = await logsService.getLogs({});
  res.send(logs);
};

const handleLogging = async (data) => {
  const log = await logsService.addLog(data);
};

const prepareLogDataFromMessage = (data) => {
  const log = {};
  log.email = data.email;
  log.newsletterName = data.name;

  return { email: data.email, newsletterName: data.name };
  return log;
};

module.exports = { handleLogging, prepareLogDataFromMessage, getLogs };
