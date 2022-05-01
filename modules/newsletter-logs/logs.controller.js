const logsService = require("./logs.service");

const getLogs = async (req, res) => {
  const logs = await logsService.getLogs({});
  res.send(logs);
};

const handleLogging = async (data) => {
  const log = await logsService.addLog(data);
};

const prepareLogDataFromMessage = (data) => ({
  email: data.email,
  newsletterName: data.name,
});

module.exports = { handleLogging, prepareLogDataFromMessage, getLogs };
