const Log = require("../../models/Log");

const getLogs = async (object) => {
  return await Log.find(object, { __v: 0 });
};

const addLog = async (logData) => {
  const log = await Log.create(logData);
  return log;
};

module.exports = { getLogs, addLog };
