module.exports = (sequelize, Datatypes) => {
    return sequelize.define('activities_interest', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        personal_activities: {
            type: Datatypes.TEXT,
        },
        other_activities: {
            type: Datatypes.TEXT,
        },
        user_id: {
            foreignKey: true,
            type: Datatypes.INTEGER,
            isInt: true
        }
    })
};