module.exports = (sequelize, Datatypes) => {
    return sequelize.define('studies_study', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: Datatypes.TEXT,
            allowNull: false,
        },
        year: {
            type: Datatypes.INTEGER,
            validate: {
                isNumeric: true
            }
        },
        institution: {
            type: Datatypes.STRING,
        },
        discipline: {
            type: Datatypes.STRING
        },
        branch: {
            type: Datatypes.STRING
        },
        series: {
            type: Datatypes.STRING
        },
        graduation: {
            type: Datatypes.STRING
        },
        mention: {
            type: Datatypes.STRING
        },
        rank: {
            type: Datatypes.STRING
        },
        average_on_20: {
            type: Datatypes.STRING
        },
        user_id: {
            foreignKey: true,
            type: Datatypes.INTEGER,
            isNumeric: true
        }
    })
};