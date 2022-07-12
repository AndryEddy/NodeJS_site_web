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
const complemtaryQuestions = require('../models/complementary_questions');
const finacing = require('../models/financing');

const bcrypt = require('bcrypt');
require('dotenv').config();

const sequelize = new Sequelize(
    {
        host: process.env.PGHOST,
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
const complementaryQuestions = complemtaryQuestions(sequelize, DataTypes);
const financing = finacing(sequelize, DataTypes);


const InitData = () => {

    //Initiate the database
    return sequelize.sync().then(_ => {
        console.log(`The database ${process.env.PGDATABASE} is successfully synchronized!`);
        // students.map(student => {
        //     Student.create({
        //         name: student.name,
        //         hp: student.hp,
        //         cp: student.cp,
        //         picture: student.picture,
        //         types: student.types
        //     })
        // });
        User.findOne({where: {id: 1}}).then(user => {
            if (user) {
                console.log(`Admin user is already created, ID: ${user.id}`)
            }
            else{
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
            }
        });
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
    activityAndInterest,
    complementaryQuestions,
    financing
};

