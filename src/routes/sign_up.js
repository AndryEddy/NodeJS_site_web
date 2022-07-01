const { User } = require('../db/sequelize');
const bcrypt = require('bcrypt');
const { send_mail } = require('../tools/mailer');
const { generate_digit } = require('../tools/digit_code');

module.exports = (app) => {
    app.post('/api/account/create', (req, res) => {
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const email = req.body.email;
        const mobile = req.body.mobile;
        const password = req.body.password;

        if (!email || !password) {
            const message = 'Login or Password is empty.';
            return res.status(400).json({ message })
        }

        if (!first_name && !last_name){
            const message = 'First name or Last name is empty.';
            return res.status(400).json({ message })
        }

        if (!mobile){
            const message = 'Mobile is empty.';
            return res.status(400).json({ message })
        }

        if (password.length < 5){
            const message = 'Password not secure: It Must be at least six characters.';
            return res.status(400).json({ message })
        }

        bcrypt.hash(password, 10).then(hashed_password=> {
            User.create({
                first_name: first_name,
                last_name: last_name,
                email: email,
                mobile: mobile,
                password: hashed_password
            }).then(async user => {
                console.log(`User account ${user.first_name} ${user.last_name} created successfully.`);
                const message = `User with ID ${user.id} is successfully created.`;

                const code_validation = generate_digit();
                user.update({
                    code_email_validation: code_validation
                });

                console.log(`= digit = ${code_validation}`);

                const subject = 'Confirmation de votre compte sur ESTI';
                const body = `<p>Bonjour ${user.first_name} ${user.last_name}, votre code d'identification est: <b>${code_validation}</b></p>`;
                const description = 'Confirmation de votre adresse email.';

                send_mail(user.email, subject, body, description).catch(error => {
                    if (error) {
                        console.log(error)
                        return res.status(400).json({ message: error })
                    }
                }).then(result => {
                    return res.status(200).json({message, result})
                })
            })
                .catch(error => {
                    return res.status(400).json({ message: error})
                })
        })

    })
}

