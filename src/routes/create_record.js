const { ValidationError, UniqueConstraintError} = require('sequelize');
const { db_access } = require('../db/bridge');
const auth = require('../auth/auth');
const imageUpload = require('../tools/images_uploading');

const express = require("express");
//const router = express.Router();
//const homeController = require("../routes/home");


module.exports = (app) => {
    app.post('/api/create/:model', auth, (req, res) => {
        const model = req.params.model;
        let database = db_access()[model];
        if (database) {
            if (req.body instanceof Array) {
                const created_record_ids = [];
                console.log(typeof created_record_ids);
                const created_record = req.body.map(data => {
                    database.create(data).then(record => {
                        if (data.files) {
                            imageUpload.checkUpload(req, res);
                            const record_updated = imageUpload.generateImage(req, record);
                            console.log(`The record with ID: ${record_updated.id} has been created.`)
                        }
                        else{
                            console.log(`The record with ID: ${record.id} has been created.`)
                        }
                    }).catch(error => {
                            if (error instanceof ValidationError) {
                                return res.status(400).json({message: error.message, data: error})
                            }
                            if (error instanceof UniqueConstraintError) {
                                return res.status(400).json({message: error.message, data: error})
                            }
                            const message = `The record ${model} could not be created, please try again later.`;
                            res.status(500).json({message, data: error})
                        });
                    return data
                });
                const message = `Many records has been created.`;
                res.json({ message, data: created_record })
            }
            else{
                database.create(req.body)
                    .then(record => {
                        if (req.body.files) {
                            imageUpload.checkUpload(req, res);
                            const record_updated = imageUpload.generateImage(req, record);
                            const message = `The record with ID: ${record_updated.id} have been created.`;
                            res.json({ message, data: record_updated })
                        }
                        else{
                            const message = `The record with ID: ${record.id} have been created.`;
                            res.json({ message, data: record })
                        }
                    })
                    .catch(error => {
                        if (error instanceof ValidationError) {
                            return res.status(400).json({message: error.message, data: error})
                        }
                        if (error instanceof UniqueConstraintError) {
                            return res.status(400).json({message: error.message, data: error})
                        }
                        const message = `The record ${model} could not be created, please try again later.`;
                        res.status(500).json({message, data: error})
                    })
            }
        }
        else{
            const message = `An error occurred during the operation, please try again later. \n
            Posted URL: api/create/${model}`;
            res.status(500).json({ message })
        }

    })
};