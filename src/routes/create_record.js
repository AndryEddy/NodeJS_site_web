const { ValidationError, UniqueConstraintError} = require('sequelize')
const { db_access } = require('../db/bridge')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.post('/api/create/:model', auth, (req, res) => {
        const model = req.params.model
        let database = db_access()[model]
        if (database) {
            database.create(req.body)
                .then(record => {
                    const message = `The record with ID: ${record.id} have been created.`
                    res.json({ message, data: record })
                })
                .catch(error => {
                    if (error instanceof ValidationError) {
                        return res.status(400).json({message: error.message, data: error})
                    }
                    if (error instanceof UniqueConstraintError) {
                        return res.status(400).json({message: error.message, data: error})
                    }
                    const message = `The record ${model} could not be created, please try again later.`
                    res.status(500).json({message, data: error})
                })
        }
        else{
            const message = `An error occurred during the operation, please try again later. \n
            Posted URL: api/create/${model}`
            res.status(500).json({ message })
        }

    })
}