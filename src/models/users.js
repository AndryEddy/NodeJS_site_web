const VALID_STATUS = ['Single', 'Married']

module.exports = (sequelize, Datatypes) => {
    return sequelize.define('users_user', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
          type: Datatypes.STRING,
          isString: true
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
        files: {
            type: Datatypes.TEXT
        },
        mobile: {
            type: Datatypes.INTEGER,
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
        fathers_name: {
            type: Datatypes.STRING,
        },
        fathers_mobile:{
            type: Datatypes.INTEGER,
            validate: {
                isNumeric: true
            }
        },
        fathers_job: {
            type: Datatypes.STRING,
        },
        fathers_email: {
            type: Datatypes.STRING,
            validate: {
                isEmail: true
            }
        },
        mothers_name: {
            type: Datatypes.STRING,
        },
        mothers_mobile:{
            type: Datatypes.INTEGER,
            validate: {
                isNumeric: true
            }
        },
        mothers_job: {
            type: Datatypes.STRING,
        },
        mothers_email: {
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
        },
        year: {
          type: Datatypes.INTEGER
        },
        level: {
            type: Datatypes.STRING
        },
        state: {
            type: Datatypes.STRING,
        },
        application_type: {
            type: Datatypes.STRING,
        }
    })
};