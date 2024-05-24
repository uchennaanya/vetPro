import nodemailer from "nodemailer";

const sendEmail = async (option) => {
  try {
    // CREATE A TRANSPORTER
    const transporter = nodemailer.createTransport({
      host: "smtps.udag.de",
      port: 587,
      auth: {
        user: process.env.EMAIL_TEST,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // DEFINE EMAIL OPTIONS
    const mailOptions = {
      from: process.env.EMAIL_TEST, // use your own email here
      to: option.email,
      subject: option.subject,
      text: option.message,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error; // rethrow the error for handling elsewhere if needed
  }
};

export default sendEmail;

//

// const sendMail = async (option) => {
//   // CREATE A TRANSPORTER
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });
//   //   DEFINE EMAIL OPTIONS
//   const mailOptions = {
//     from: "TechWings surpport<martinsanya19@gmail.com>",
//     to: option.email,
//     subject: option.subject,
//     text: option.message,
//   };

//   await transporter.sendMail(mailOptions);
// };

// export default sendMail;
