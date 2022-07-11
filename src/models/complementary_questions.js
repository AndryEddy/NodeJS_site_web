module.exports = (sequelize, Datatypes) => {
    return sequelize.define('complementaries_questions', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        motivation: {
            type: Datatypes.TEXT
        },
        pathway: {
            type: Datatypes.TEXT
        },
        explanation: {
            type: Datatypes.TEXT
        },
        release_exemple: {
            type: Datatypes.TEXT
        },
        source_from_website: {
            type: Datatypes.BOOLEAN
        },
        source_from_publicity: {
            type: Datatypes.BOOLEAN
        },
        source_from_friends: {
            type: Datatypes.BOOLEAN
        },
        source_from_conference: {
            type: Datatypes.BOOLEAN
        },
        source_from_others: {
            type: Datatypes.TEXT
        },
        comment: {
            type: Datatypes.TEXT
        },
        user_id: {
            foreignKey: true,
            type: Datatypes.INTEGER,
            isInt: true
        }
    })
};