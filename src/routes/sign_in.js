const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
                    //JWT
                    const token = jwt.sign({ userId: user.id }, process.env.jwt_token_private_key,{ expiresIn: '24h' }, {})

                    const message = `User connected successfully.`
                    const session = req.session
                    session.user_id = user.id
                    return res.json({ message, data: user, token, session})
                }
            })
        }).catch(error => {
            const message = 'User cannot be connected, please try again later.'
            return res.status(500).json({ message, data: error.message})
        })
    })
}