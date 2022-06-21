const nodemailer = require('nodemailer')
require('dotenv').config()

exports.send_mail = (mail_to, subject, body, description) => {

    console.log(process.env.mailer_service)
    console.log(process.env.mailer_port)
    console.log(process.env.mailer_login)
    console.log(process.env.mailer_password)

    let mailTransporter = nodemailer.createTransport({
        service: process.env.mailer_service,
        port: process.env.mailer_port,
        secure: true,
        secureConnection: false,
        auth: {
            user: process.env.mailer_login,
            pass: process.env.mailer_password
        },
        tls:{
            rejectUnAuthorized:false
        }
    })

    let mailDetails = {
        from: process.env.mailer_login,
        to: mail_to,
        subject: subject,
        text: description,
        html: body,
    }

    mailTransporter.sendMail(mailDetails, function(error, info) {
        if(error) {
            const message = `An error occurs during the mail sending: ${error}`
            console.log(message)
            return error.toString()
        } else {
            console.log(`Email sent successfully: ${info.response}`)
            return true
        }
    }).then(result => {
        console.log(result)
    })
}




