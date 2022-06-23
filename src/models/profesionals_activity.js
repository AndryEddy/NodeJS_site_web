module.exports = (sequelize, Datatypes) => {
    return sequelize.define('profesionals_activity', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Datatypes.STRING,
            allowNull: false
        },
        date_from: {
            type: Datatypes.DATE,
            isDate: true,
            allowNull: false
        },
        date_to: {
            type: Datatypes.DATE,
            isDate: true,
            allowNull: false
        },
        company: {
            type: Datatypes.STRING,
            allowNull: false
        },
        employee_number:{
            type: Datatypes.INTEGER,
            isInt: true
        },
        turnover: {
            type: Datatypes.FLOAT,
            isFloat: true
        },
        n_plus_1_function: {
            type: Datatypes.TEXT
        },
        function: {
            type: Datatypes.TEXT
        },
        n_minus_number: {
            type: Datatypes.INTEGER,
            isInt: true
        },
        activity_sector: {
            type: Datatypes.TEXT
        },
        salary: {
            type: Datatypes.FLOAT,
            isFloat: true
        },
        comment: {
            type: Datatypes.TEXT
        },
        other_anterior_activity: {
            type: Datatypes.TEXT
        },
        user_id: {
            type: Datatypes.INTEGER,
            foreignKey: true,
            isInt: true
        }
    })
}