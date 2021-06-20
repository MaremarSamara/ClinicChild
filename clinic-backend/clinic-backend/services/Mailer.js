const nodeMailer = require("nodemailer");


class MailerService {
    constructor() {
        this.setting = {
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "marysamara2001@gmail.com",
                pass: "maremarsamara2001"
            }
        }
        // call bootstrap here
        this.bootstrap();
    }
    // bootstrap mail
    bootstrap() {
        this.smtpTransporter = nodeMailer.createTransport(this.setting)
    }
    // sendMail method
    async sendMail(options) {
        this.smtpTransporter.sendMail(options, (err, response) => {
            if(err) {
                return Promise.reject({status: 400, message: "failed to send mail", error: err})
            }
            return Promise.resolve({status: 200,message: "mail sent successfully"})
        })
    }
}


// export mailer
const Mailer = new MailerService();




module.exports = Mailer;