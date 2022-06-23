const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const { send_mail } = require('../tools/mailer')

module.exports = (app) => {
    app.post('/api/account/create', (req, res) => {
        const first_name = req.body.first_name
        const last_name = req.body.last_name
        const email = req.body.email
        const mobile = req.body.mobile
        const password = req.body.password

        if (!email || !password) {
            const message = 'Login or Password is empty.'
            return res.status(400).json({ message })
        }

        if (!first_name && !last_name){
            const message = 'First name or Last name is empty.'
            return res.status(400).json({ message })
        }

        if (!mobile){
            const message = 'Mobile is empty.'
            return res.status(400).json({ message })
        }

        if (password.length < 5){
            const message = 'Password not secure: It Must be at least six characters.'
            return res.status(400).json({ message })
        }

        bcrypt.hash(password, 10).then(hashed_password=> {
            User.create({
                first_name: first_name,
                last_name: last_name,
                email: email,
                mobile: mobile,
                password: hashed_password
            }).then(user => {
                console.log(`User account ${user.first_name} ${user.last_name} created successfully.`)
                const message = `User with ID ${user.id} is successfully created.`


                //const subject = 'Confirmation de votre compte sur ESTI'
                //const body = `<p>Bonjour ${user.first_name} ${user.last_name}, votre code d'identification est: <b>478765</b></p>`
                //const description = 'Confirmation de votre adresse email.'

                //const mail_sent = send_mail(user.email, subject, body, description)
                return res.json({ message , data: user})

                //console.log(`mail_sent ${mail_sent}`)
                //if (mail_sent === true) {
                  //  return res.json({ message , data: user})
                //}
                //else{
                  //  return res.json({ message: mail_sent })
                //}
            })
                .catch(error => {
                    return res.status(400).json({ message: error})
                })
        })

    })
}

