const { Op } = require('sequelize');
const { db_access } = require('../db/bridge');
const auth = require('../auth/auth');

module.exports = (app) => {
    app.get('/api/findall/:model', auth, (req, res) => {
        const model = req.params.model;
        let database = db_access()[model];

        if (database) {
            const first_name = req.query.first_name;
            const last_name = req.query.last_name;
            const email = req.query.email;
            const name = req.query.name;
            const description = req.query.description;
            const title = req.query.title;
            const user_id = req.query.user_id;

            const limit = parseInt(req.query.limit) || 5;

            if (user_id){
                if (user_id.length < 2) {
                    const message = 'The term used in search must have at least two character';
                    return res.status(400).json({message});
                }
                return database.findAndCountAll({
                    where: {
                        user_id: {
                            [Op.eq]: parseInt(user_id)
                        }
                    },
                    order: ['user_id'],
                    limit: limit
                }).then(({count, rows}) => {
                    const message = `There is ${count} records found with the term ${user_id}.`;
                    return res.json({message: message, data: rows});
                });
            }

            if (name){
                if (name.length < 2) {
                    const message = 'The term used in search must have at least two character';
                    return res.status(400).json({message});
                }
                return database.findAndCountAll({
                    where: {
                        name: {
                            [Op.like]: `%${name}%`
                        }
                    },
                    order: ['name'],
                    limit: limit
                }).then(({count, rows}) => {
                    const message = `There is ${count} records found with the term ${name}.`;
                    return res.json({message: message, data: rows});
                });
            }

            if (description){
                if (description.length < 2) {
                    const message = 'The term used in search must have at least two character';
                    return res.status(400).json({message});
                }
                return database.findAndCountAll({
                    where: {
                        description: {
                            [Op.like]: `%${description}%`
                        }
                    },
                    order: ['description'],
                    limit: limit
                }).then(({count, rows}) => {
                    const message = `There is ${count} records found with the term ${description}.`;
                    return res.json({message: message, data: rows});
                });
            }

            if (title){
                if (title.length < 2) {
                    const message = 'The term used in search must have at least two character';
                    return res.status(400).json({message});
                }
                return database.findAndCountAll({
                    where: {
                        title: {
                            [Op.like]: `%${title}%`
                        }
                    },
                    order: ['title'],
                    limit: limit
                }).then(({count, rows}) => {
                    const message = `There is ${count} records found with the term ${title}.`;
                    return res.json({message: message, data: rows});
                });
            }

            if (first_name && last_name && email){
                if (first_name.length < 2 || last_name.length < 2 || email.length < 2) {
                    const message = 'The term used in search must have at least two character';
                    return res.status(400).json({message});
                }
                return database.findAndCountAll({
                    where: {
                        first_name: {
                            [Op.like]: `%${first_name}%`
                        },
                        last_name: {
                            [Op.like]: `%${last_name}%`
                        },
                        email: {
                            [Op.eq]: email
                        }
                    },
                    order: ['last_name'],
                    limit: limit
                }).then(({count, rows}) => {
                    const message = `There is ${count} records found with the term ${first_name} ${last_name} - ${email}.`;
                    return res.json({message: message, data: rows});
                });
            }

            if (first_name && last_name){
                if (first_name.length < 2 || last_name.length < 2) {
                    const message = 'The term used in search must have at least two character';
                    return res.status(400).json({message});
                }
                return database.findAndCountAll({
                    where: {
                        first_name: {
                            [Op.like]: `%${first_name}%`
                        },
                        last_name: {
                            [Op.like]: `%${last_name}%`
                        }
                    },
                    order: ['last_name'],
                    limit: limit
                }).then(({count, rows}) => {
                    const message = `There is ${count} records found with the term ${first_name} ${last_name}.`;
                    return res.json({message: message, data: rows});
                });
            }

            if (first_name || last_name || email){
                const search_value = first_name || last_name || email;
                if (search_value.length < 2) {
                    const message = 'The term used in search must have at least two character';
                    return res.status(400).json({message});
                }

                if (first_name) {
                    return database.findAndCountAll({
                        where: {first_name: {
                                [Op.like]: `%${first_name}%`
                            },
                        },
                        order: ['first_name'],
                        limit: limit
                    }).then(({count, rows}) => {
                        const message = `There is ${count} records found with the term ${first_name}.`;
                        return res.json({message: message, data: rows});
                    });

                }
                else if(last_name){
                    return database.findAndCountAll({
                        where: {last_name: {
                                [Op.like]: `%${last_name}%`
                            },
                        },
                        order: ['last_name'],
                        limit: limit
                    }).then(({count, rows}) => {
                        const message = `There is ${count} records found with the term ${last_name}.`;
                        return res.json({message: message, data: rows});
                    });
                }
                else if (email){
                    return database.findAndCountAll({
                        where: {email: {
                                [Op.eq]: email
                            },
                        },
                        order: ['email'],
                        limit: limit
                    }).then(({count, rows}) => {
                        const message = `There is ${count} records found with the email ${email}.`;
                        return res.json({message: message, data: rows});
                    });
                }
            }
            else {
                database.findAll({order: ['id']}).then(record => {
                    const message = `The ${model} record list is successfully kept`;
                    res.json({message: message, data: record});
                }).catch(error => {
                    const message = `The ${model} record cannot be get, Please try after a while.`;
                    res.status(500).json({message: message, data: error });
                });
            }
        }
        else{
            const message = `An error occurred during the operation, please try again later. \n
            Posted URL: api/findall/${model}`;
            res.status(500).json({ message });
        }

    });
};