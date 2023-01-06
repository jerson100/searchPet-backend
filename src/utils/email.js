const nodemailer = require("nodemailer");

const createEmail = ({ from, to, subject, text, html }) => {
  return { from, to, subject, text, html };
};

const sendRegisterTokenEmail = async (to, token) => {
  const message = createEmail({
    from: process.env.PRIVATE_REGISTER_EMAIL,
    to,
    subject: "Registro de cuenta en searchPet",
    html: `
        <p>Hola!, muchas gracias por registrar su cuenta en searchPet, dale click <a href="${process.env.FRONTEND_URL}/auth/verify?token=${token}">aquí</a> para poder confirmar su cuenta y poder usar todas las funcionalidades de la aplicación</p>
    `,
  });
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.PRIVATE_REGISTER_EMAIL,
      pass: process.env.PRIVATE_REGISTER_PASS,
    },
  });
  await transporter.sendMail(message);
};

module.exports = {
  createEmail,
  sendRegisterTokenEmail,
};
