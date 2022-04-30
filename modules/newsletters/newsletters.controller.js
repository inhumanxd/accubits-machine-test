const csv = require("csv-parser");
const fs = require("fs");
const fsPromise = require("fs/promises");
const { addJobToQueue } = require("../../helpers/rabbitmq");

const sendNewsLetter = async (req, res) => {
  const RABBITMQ_QUEUE = process.env.RABBITMQ_QUEUE;
  const csvPath = `${req.file.destination}${req.file.filename}`;
  const csvData = await _parseCsv(csvPath);
  const jobPromises = csvData.map((row) => addJobToQueue(RABBITMQ_QUEUE, row));

  // Promise.allSettled instead of Promise.all because not all promises might fulfill.
  const results = await Promise.allSettled(jobPromises);

  if (req.body.deleteAfterProcessing === "true") _deleteCsv(csvPath);

  res.send("Newsletters will shortly be sent!");
};

const _parseCsv = async (csvPath) => {
  const results = [];
  const readStream = fs
    .createReadStream(csvPath)
    .pipe(csv())
    .on("data", (data) => results.push(data));

  return new Promise((resolve, reject) => {
    readStream.on("end", () => {
      resolve(results);
    });
    readStream.on("error", () => {
      console.error(error);
      reject(error.message);
    });
  });
};

const _deleteCsv = async (csvPath) => {
  try {
    const dir = __dirname.split("\\").splice(0, 3).join("\\");
    csvPath = dir + "\\" + csvPath;
    fsPromise.unlink(csvPath);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendNewsLetter };
