const amqp = require("amqplib");
const {
  handleLogging,
  prepareLogDataFromMessage,
} = require("../modules/newsletter-logs/logs.controller");
const { getUser } = require("../modules/users/users.service");
const { sendEmail } = require("../smtpServer/smtp-service");

const connectAndReturnChannel = async () => {
  const RABBITMQ_URL = process.env.RABBITMQ_URL;

  const connection = await amqp.connect(RABBITMQ_URL);
  return await connection.createChannel();
};

const addJobToParkingLot = async (job) => {
  const parkingLotQueue = process.env.RABBITMQ_SECONDARY_QUEUE;
  const sent = await addJobToQueue(parkingLotQueue, job);
  return sent;
};

const addJobToQueue = async (queue, job) => {
  const channel = await connectAndReturnChannel();
  job = JSON.stringify(job);
  const jobBuffer = Buffer.from(job);

  const sent = channel.sendToQueue(queue, jobBuffer);
  return sent;
};

const consumeJob = async (queue) => {
  const channel = await connectAndReturnChannel();

  channel.consume(queue, async (message) => {
    const messageStr = message.content.toString();
    const messageJson = JSON.parse(messageStr);
    try {
      channel.ack(message);

      const user = await getUser({ email: messageJson.email });

      if (!user)
        throw new Error(
          `User with email ${messageJson.email} does not exist. `
        );

      const { firstName, lastName } = user;
      const fullName = firstName + " " + (lastName ? lastName : "");
      messageJson.content = `Hello ${fullName}.<br>${messageJson.content}`;
      await sendEmail(messageJson);

      const logData = prepareLogDataFromMessage(messageJson);

      handleLogging(logData);

      // const channel = await connectAndReturnChannel();
      // channel.ack(message);
    } catch (error) {
      // console.error(error);
      addJobToParkingLot(messageJson);
    }
  });
};

module.exports = {
  connectAndReturnChannel,
  addJobToParkingLot,
  addJobToQueue,
  consumeJob,
};
