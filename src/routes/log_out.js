const { User } = require('../db/sequelize');
//const bcrypt = require('bcrypt');

module.exports = (app) => {
    app.get('/api/account/logout', (req, res) => {
        const userID = req.body.session.user_id;
        if (req.body.session && req.body.session.user_id) {
            User.findByPk(parseInt(userID)).then(record => {
                if (record === null) {
                    const message = `This user with id: ${userID} does not exist in the database`;
                    return res.status(404).json({message})
                }
                record.update({token: ''}, {where: {id: record.id}});
                delete req.body.session.user_id || req.body.session.destroy();

            }).catch(error => {
                    const message = `An error occured during the user log out session.`;
                    res.status(500).json({message, data: error})
                });
            const message = `User logged out successfully.`;
            res.json({ message });
        } else {
            const message = `User is not logged in.`;
            res.json({ message });
        }
    });
};