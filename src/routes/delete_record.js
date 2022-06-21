const { db_access } = require('../db/bridge')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.delete('/api/delete/:model/:id', auth, (req, res) => {
        const ID = req.params.id
        const model = req.params.model
        let database = db_access()[model]

        if (database) {
            database.findByPk(req.params.id).then(record => {
                if (record === null) {
                    const message = `The requested record does not exist or is already deleted.`
                    return res.status(404).json({message})
                }
                const deletedRecord = record
                return record.destroy({
                    where: { id: record.id }
                })
                    .then(_ => {
                        const message = `The record with ID: ${deletedRecord.id} has been deleted.`
                        res.json({message, data: deletedRecord })
                    })
            }).catch(error => {
                const message = `The record could not be deleted, please try later.`
                res.status(500).json({message, data: error})
            })

        }
        else{
            const message = `An error occurred during the operation, please try again later. \n
            Posted URL: api/delete/${model}/${ID}`
            res.status(500).json({ message })
        }
    })
}