module.exports = (sequelize, Datatypes) => {
    return sequelize.define('trainings_seminar', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Datatypes.TEXT,
            allowNull: false,
        },
        seminar_date: {
            type: Datatypes.DATE,
            isDate: true,
            allowNull: false
        },
        user_id: {
            foreignKey: true,
            type: Datatypes.INTEGER,
            isInt: true
        }
    })
};