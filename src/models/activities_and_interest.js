module.exports = (sequelize, Datatypes) => {
    return sequelize.define('activities_interest', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Datatypes.TEXT,
            allowNull: false,
        },
        user_id: {
            foreignKey: true,
            type: Datatypes.INTEGER,
            isInt: true
        }
    })
};