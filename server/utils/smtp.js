export const mailChannels = (config, message) => {
  return new Promise((resolve, reject) => {
    const { to, subject, html } = message;
    const send = fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: to.email, name: to.name }],
          cc: [{ email: config.mail.cc }]
        }],
        from: {
          email: config.mail.from,
          name: `"${config.mail.fromName}"`
        },
        subject,
        content: [{
          type: "text/html",
          value: html
        }]
      })
    });
    if (send.status === 200) {
      resolve(true);
    }
    else {
      reject(new Error("MailChannels error"));
    }
  });
};

export const sendMail = async (config, message) => {
  if (!process.dev) {
    return mailChannels(config, message);
  }
  else {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      port: config.mail.port,
      host: config.mail.host,
      auth: {
        user: config.mail.login,
        pass: config.mail.pass
      }
    });

    const verified = await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          reject(error);
        }
        else {
          resolve(success);
        }
      });
    });

    return new Promise((resolve, reject) => {
      if (!verified) {
        reject(new Error("SMTP server not verified."));
      }
      const { to, subject, html } = message;
      const mail = {
        to: `"${to.name}" <${to.email}>`,
        subject,
        html,
        cc: config.mail.cc,
        from: `"${config.mail.fromName}" <${config.mail.from}>`
      };

      transporter.sendMail(mail, (err) => {
        if (err) {
          console.warn(err);
          reject(err);
        }
        else {
          resolve(true);
        }
      });
    });
  }
};
