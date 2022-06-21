const { Sequelize, DataTypes } = require('sequelize')
const studentModel = require('../models/student')
const userModel = require('../models/users')
const productModel = require('../models/products')
const students = require('./student_data')
const bcrypt = require('bcrypt')
// Use process.env.config_value instead of appConfig because .env file more helpful
require('dotenv').config()
//Call app config which contains all the app configuration
//const { appConfig } = require("../../app-config");


//Initiate the database
const sequelize = new Sequelize(
    process.env.db_name,
    process.env.db_user,
    process.env.db_password,
    {
        host: process.env.db_host,
        dialect:"postgres",
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        },
        logging: false
    }
)

//Call the models
const Student = studentModel(sequelize, DataTypes)
const User = userModel(sequelize, DataTypes)
const Product = productModel(sequelize, DataTypes)

const initDb = () => {
    return sequelize.sync({force: true}).then(_ => {
        console.log(`The database ${process.env.db_name} is successfully synchronized!`)
        students.map(student => {
            Student.create({
                name: student.name,
                hp: student.hp,
                cp: student.cp,
                picture: student.picture,
                types: student.types
            })
        })
        bcrypt.hash('123admin456', 10)
            .then(hash => {
                User.create({
                    first_name: 'Admin',
                    last_name: 'Administrator',
                    email: 'admin@user.com',
                    mobile: '000000',
                    password: hash
                }).then(user => console.log(user.toJSON()))
            })

    })
}

module.exports = {
    initDb, Student, User, Product
}