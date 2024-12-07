const nodemailer = require('nodemailer');

const sendEmail = async (mailOptions) => new Promise((resolve, reject) => {
  const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    },
  );

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      reject(error);
    } else {
      resolve(info.response);
      console.log(`Email sent: ${info.response}`);
    }
  });
});

const sendSignUpEmail = async (user) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Virtual Events - Sign Up Confirmation',
    text: `Hi ${user.name},\n\nThank you for signing up to Virtual Events Platform!`,
    html: `<h1>Hi ${user.name},</h1><p>Thank you for signing up to Virtual Events Platform!</p>`,
  };

  return sendEmail(mailOptions);
}

const sendEventRegistrationEmail = async (user, event) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Virtual Events - Event Registration Confirmation',
    text: `Hi ${user.name},\n\nYou have successfully registered for the event: ${event.title}.`,
    html: `<h1>Hi ${user.name},</h1><p>You have successfully registered for the event: ${event.title}.</p>`,
  };
  return sendEmail(mailOptions);
};

const cancelEventRegistrationEmail = async (user, event) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Virtual Events - Event Registration Cancellation',
    text: `Hi ${user.name},\n\nYou have successfully cancelled your registration for the event: ${event.title}.`,
    html: `<h1>Hi ${user.name},</h1><p>You have successfully cancelled your registration for the event: ${event.title}.</p>`,
  };
  return sendEmail(mailOptions);
};

module.exports = {
  sendSignUpEmail,
  sendEventRegistrationEmail,
  cancelEventRegistrationEmail,
};
