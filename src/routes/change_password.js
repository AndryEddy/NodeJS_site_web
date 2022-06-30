const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')

module.exports = (app) => {
    app.post('/api/change/password', (req, res) => {
      user_id = req.body.id
      new_password = req.body.password
      User.findOne({where: {id: parseInt(user_id)}}).then(user => {
          if (!user){
              const message = 'Error when trying to find user on database, the user does not exist !'
              return res.status(404).json({ message })
          }

          bcrypt.hash(new_password, 10).then(hashed_password => {
              user.update({
                  password: hashed_password
              }).then(result => {
                  const message = `Password has been changed successfully!`
                  return res.json({ message })
              }).catch(error => {
                if (error) {
                  return res.status(400).json({ message: error })
                }
              })
            })
      }).catch(error => {
          const message = 'An error occurred during the password updating, please try again later.'
          return res.status(500).json({ message, data: error.message})
    })
})

}
