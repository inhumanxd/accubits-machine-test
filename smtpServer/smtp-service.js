const nodemailer = require("nodemailer");

const _getSmtpDetails = async () => {
  let user, pass, host, port;

  user = process.env.SMTP_USER_EMAIL;
  pass = process.env.SMTP_USER_PASSWORD;
  host = process.env.SMTP_HOST;
  port = process.env.SMTP_PORT;

  // Generate test SMTP service account from ethereal.email
  if (process.env.NODE_ENV === "development") {
    const testAccount = await nodemailer.createTestAccount();
    user = testAccount.user;
    pass = testAccount.pass;
  }

  // const user = process.env.SMTP_USER_EMAIL;
  // const pass = process.env.SMTP_USER_PASSWORD;

  return { user, pass, host, port };
};

const _getSmtpConfigurations = async () => {
  const { user, pass, host, port } = await _getSmtpDetails();
  let transporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: false,
    auth: {
      user: user,
      pass: pass,
    },
  });

  return transporter;
};

const _getEmailOptions = (emailData) => {
  let emailOptions = {
    from: '"Accubits Newsletters 👻" <test@news.com>',
    to: emailData.email,
    subject: `Newsletter - ${emailData.name}`,
    html: emailData.content,
  };
  return emailOptions;
};

const _verifySMTPConfiguration = async (transporter) => {
  return await transporter.verify();
};

const sendEmail = async (emailData) => {
  const main = async () => {
    const emailOptions = _getEmailOptions(emailData);
    const transporter = await _getSmtpConfigurations();
    // const verified = await _verifySMTPConfiguration(transporter);

    // if (!verified) {
    //   console.log(verified);
    // }
    let info = await transporter.sendMail(emailOptions);
    return Promise.resolve();
    // console.log(info);
    // console.log("Message sent: %s", info.messageId);

    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  };

  return new Promise((resolve, reject) => {
    main()
      .then((res) => resolve())
      .catch((e) => {
        reject(e);
      });
  });
};
module.exports = { sendEmail };
