const VALID_STATUS = ['Single', 'Married']

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('users_user', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        code_email_validation: {
          type: Datatypes.STRING,
        },
        first_name: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: Datatypes.STRING,
            allowNull: false,
            isUppercase: true
        },
        password: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        email: {
            type: Datatypes.STRING,
            allowNull: false,
            unique: {
                msg: 'This email is already taken'
            },
            validate: {
                isEmail: true,

            }
        },
        picture: {
          type: Datatypes.TEXT
        },
        mobile: {
            type: Datatypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true

            }
        },
        birth_date: {
            type: Datatypes.DATE,
            validate: {
                isDate: true,
                isAfter: "1980-12-31"
            }
        },
        birth_place: {
            type: Datatypes.STRING,
        },
        martial_status: {
            type: Datatypes.STRING,
        },
        nationality: {
            type: Datatypes.STRING,
        },
        child_number:{
            type: Datatypes.INTEGER,
            isNumeric: true
        },
        address: {
            type: Datatypes.STRING,
        },
        father_name: {
            type: Datatypes.STRING,
        },
        father_mobile:{
            type: Datatypes.INTEGER,
            validate: {
                isNumeric: true
            }
        },
        father_job: {
            type: Datatypes.STRING,
        },
        father_email: {
            type: Datatypes.STRING,
            validate: {
                isEmail: true
            }
        },
        mother_name: {
            type: Datatypes.STRING,
        },
        mother_mobile:{
            type: Datatypes.INTEGER,
            validate: {
                isNumeric: true
            }
        },
        mother_job: {
            type: Datatypes.STRING,
        },
        mother_email: {
            type: Datatypes.STRING,
            validate: {
                isEmail: true
            }
        },
        phone_number1: {
            type: Datatypes.INTEGER,
            isNumeric: true
        },
        phone_number2: {
            type: Datatypes.INTEGER,
            isNumeric: true
        },
        phone_number3: {
            type: Datatypes.INTEGER,
            isNumeric: true
        },
        personal_address: {
            type: Datatypes.STRING
        }
    })
}