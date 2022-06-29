const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { generate_digit } = require('../tools/digit_code')
const {send_mail} = require("../tools/mailer");

module.exports = (app) => {
    app.post('/api/login', (req, res) => {
        User.findOne({where: {email: req.body.email}}).then(user => {
            if (!user){
                const message = 'This user does not exist!'
                return res.status(404).json({ message })
            }
            bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
                if (!isPasswordValid) {
                    const message = `Sorry, the password is incorrect!`
                    return res.status(401).json({ message })
                }
                else{
                    const message = `User credentials validated, Sending validation code ...`
                    //Generate digit code
                    const code_validation = generate_digit()
                    user.update({
                        code_email_validation: code_validation
                    })

                    const subject = `Nous vérifions qu'il s'agit bien de vous.`
                    const body = `<p>Bonjour ${user.first_name} ${user.last_name}, votre code d'identification est: <b>${code_validation}</b></p>`
                    const description = 'Confirmation de votre adresse email.'

                    send_mail(user.email, subject, body, description).catch(error => {
                        if (error) {
                            console.log(error)
                            return res.status(400).json({ message: error })
                        }
                    }).then(result => {
                        return res.status(200).json({message, result})
                    })
                }
            })
        }).catch(error => {
            const message = 'User cannot be connected, please try again later.'
            return res.status(500).json({ message, data: error.message})
        })
    })
}