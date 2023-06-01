import mailChannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

export const mailChannels = (config, message) => mailChannelsPlugin({
  personalizations: [
    {
      to: [{ email: message.to, name: message.name }]
    }
  ],
  from: {
    email: config.mail.from,
    name: `"${config.mail.fromName}"`
  },
  subject: message.subject,
  content: [
    {
      type: "text/html",
      value: message.html
    }
  ],
  respondWith: () => {
    return new Response(
      "Thank you for submitting your enquiry. A member of the team will be in touch shortly."
    );
  }
});

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
  }
};
