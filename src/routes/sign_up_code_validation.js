const { User } = require('../db/sequelize');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
    app.post('/api/user/account/session', (req, res) => {
        User.findOne({where: {code_email_validation: `${req.body.code_email_validation}`}}).then(user => {
            if (!user){
                const message = 'This verification code is not correct !';
                return res.status(404).json({ message })
            }

            //JWT
            const token = jwt.sign({ userId: user.id }, process.env.jwt_token_private_key,{ expiresIn: process.env.jwt_token_expiration }, {});
            const message = `User connected successfully.`;
            const session = req.session;
            session.user_id = user.id;
            return res.json({ message, data: user, token, session })

        }).catch(error => {
            const message = 'User cannot be connected, please try again later.';
            return res.status(500).json({ message, data: error.message})
        })
    })
};
