const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const { sendEmailValidator } = require("../validation/emailValidator");

class MailService {
  getTemplate(type) {
    if (type == "VERIFY_EMAIL")
      return `<b>your verification code is [VERIFICATION_CODE]</b>`;

    if (type == "ALERT_NOTIFICATION")
      return `<p>Your check on the [URL] goes down </p>
              <p>ResponseTime: [RESPONSE_TIME] </p>
              <p>statusCode: [STATUS_CODE] </p>
              <p>Message: [STATUS_MESSAGE] </p>`;
  }

  replace(template, variables) {
    Object.keys(variables).forEach((key) => {
      template = template.replace(key, variables[key]);
    });

    return template;
  }

  getSubject(type) {
    if (type == "VERIFY_EMAIL") return "Verify your email";

    if (type == "ALERT_NOTIFICATION") return "Check alert";
  }

  async send(emailData) {
    try {
      console.log("send ُEmail");

      const ValidationError = sendEmailValidator(emailData);
      if (ValidationError) {
        console.log(ValidationError.error.details[0].message);
        return 
      }
     
      let to = emailData.to;
      let type = emailData.type;
      let variables = emailData.variables;
      let subject = this.getSubject(type);
      let template = this.getTemplate(type);
      template = this.replace(template, variables);

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 587, false for other ports
        auth: {
          user: "shenoudafarouk111@gmail.com",
          pass: "123mmm123",
        },
      });

      // setup email data with unicode symbols
      let mailOptions = {
        from: '"UpTime" <no-reply@UpTime.com>',
        to,
        subject,
        html: template,
      };

      // send mail with defined transport object
      let info = await transporter.sendMail(mailOptions);

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MailService;
