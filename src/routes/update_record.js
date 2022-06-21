const { db_access } = require('../db/bridge')
const { ValidationError, UniqueConstraintError} = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.put('/api/write/:model/:id', auth, (req, res) => {
        const id = req.params.id
        const model = req.params.model
        let database = db_access()[model]
        if (database) {
            database.update(req.body, {
                where: { id: id }
            })
                .then(_ => {
                    return database.findByPk(id).then(record => {
                        if (record === null) {
                            const message = `The requested record does not exist, please verify the ID.`
                            return res.status(404).json({message})
                        }
                        const message = `The record with ID ${record.id} has been modified.`
                        res.json({message, data: record })
                    })
                }).catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({message: error.message, data: error})
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({message: error.message, data: error})
                }
                const message = `The record cannot be modified, please try later.`
                res.status(500).json({message, data: error})
            })
        }
        else{
            const message = `An error occurred during the operation, please try again later. \n
            Posted URL: api/write/${model}/${id}`
            res.status(500).json({ message })
        }
    })
}