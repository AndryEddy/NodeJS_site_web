module.exports = (sequelize, Datatypes) => {
    return sequelize.define('languages_level', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Datatypes.STRING,
        },
        mother_tongue: {
            type: Datatypes.STRING,
        },
        written: {
            type: Datatypes.INTEGER
        },
        speaking: {
            type: Datatypes.INTEGER
        },
        user_id: {
            foreignKey: true,
            type: Datatypes.INTEGER,
            isInt: true
        },
    })
};