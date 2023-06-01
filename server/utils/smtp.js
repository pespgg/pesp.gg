import nodemailer from "nodemailer";

let transporter = null;
let config = null;

export const setupMail = async (event) => {
  config = useRuntimeConfig(event);
  transporter = nodemailer.createTransport({
    port: config.mail.port,
    host: config.mail.host,
    auth: {
      user: config.mail.login,
      pass: config.mail.pass
    }
  });

  return await new Promise((resolve, reject) => {
    transporter.verify((error, success) => {
      if (error) {
        reject(error);
      }
      else {
        resolve(success);
      }
    });
  });
};

export const sendMail = message => new Promise((resolve, reject) => {
  const mail = {
    ...message,
    cc: config.mail.cc,
    from: `"${config.mail.fromName}" <${config.mail.from}>`
  };

  transporter.sendMail(mail, (err, info) => {
    if (err) {
      console.warn(err);
      reject(err);
    }
    else {
      resolve(info);
    }
  });
});
