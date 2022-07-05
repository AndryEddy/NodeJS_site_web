const { Sequelize, DataTypes } = require('sequelize');
const studentModel = require('../models/student');
const userModel = require('../models/users');
const productModel = require('../models/products');
const eventModel = require('../models/events');
const studyModel = require('../models/studies');
const students = require('./student_data');
const languageLevelModel = require('../models/language_level');
const trainingSeminarModel = require('../models/training_seminar');
const profesionalActivityModel = require('../models/profesionals_activity');
const activityAndInterestModel = require('../models/activities_and_interest');

const bcrypt = require('bcrypt');
require('dotenv').config();

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
);

//Call the models
const Student = studentModel(sequelize, DataTypes);
const User = userModel(sequelize, DataTypes);
const Product = productModel(sequelize, DataTypes);
const Event = eventModel(sequelize, DataTypes);
const Study = studyModel(sequelize, DataTypes);
const LanguageLevel = languageLevelModel(sequelize, DataTypes);
const trainingSeminar = trainingSeminarModel(sequelize, DataTypes);
const profesionalActivity = profesionalActivityModel(sequelize, DataTypes);
const activityAndInterest = activityAndInterestModel(sequelize, DataTypes);


const InitData = () => {

    //Initiate the database
    return sequelize.sync({force: true}).then(_ => {
        console.log(`The database ${process.env.db_name} is successfully synchronized!`);
        students.map(student => {
            Student.create({
                name: student.name,
                hp: student.hp,
                cp: student.cp,
                picture: student.picture,
                types: student.types
            })
        });
        bcrypt.hash('123admin456', 10)
            .then(hash => {
                User.create({
                    first_name: 'Superuser',
                    last_name: 'Administrator',
                    email: 'admin@user.user',
                    mobile: '000000',
                    password: hash
                }).then(user => console.log(user.toJSON()))
            })


    })
}

module.exports = {
    InitData,
    Student,
    User,
    Product,
    Event,
    Study,
    LanguageLevel,
    trainingSeminar,
    profesionalActivity,
    activityAndInterest
};

