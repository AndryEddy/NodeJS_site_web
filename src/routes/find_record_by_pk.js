const { db_access } = require('../db/bridge')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/:model/:id', auth, (req, res) => {
        const id = req.params.id
        const model = req.params.model
        let database = db_access()[model]
        if (database) {
            database.findByPk(req.params.id)
                .then(record => {
                    if (record === null) {
                        const message = `The requested record does not exist, please verify the ID.`
                        return res.status(404).json({message})
                    }
                    const message = 'One record have been found.'
                    res.json({ message, data: record })
                })
                .catch(error => {
                    const message = `The record cannot be requested, please try again later.`
                    res.status(500).json({message, data: error})
                })
        }
        else{
            const message = `An error occurred during the operation, please try again later. \n
            Posted URL: api/${model}/${id}`
            res.status(500).json({ message })
        }

    })
}