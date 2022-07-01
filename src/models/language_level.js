module.exports = (sequelize, Datatypes) => {
    return sequelize.define('languages_level', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        mother_tongue: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        good_written: {
            type: Datatypes.BOOLEAN
        },
        average_written: {
            type: Datatypes.BOOLEAN
        },
        low_written: {
            type: Datatypes.BOOLEAN
        },
        good_speaking: {
            type: Datatypes.BOOLEAN
        },
        average_speaking: {
            type: Datatypes.BOOLEAN
        },
        low_speaking: {
            type: Datatypes.BOOLEAN
        },
        user_id: {
            foreignKey: true,
            type: Datatypes.INTEGER,
            isInt: true
        },
    })
};