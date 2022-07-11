module.exports = (sequelize, Datatypes) => {
    return sequelize.define('financings_financing', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        addressed_to: {
            type: Datatypes.TEXT
        },
        signature_and_cachet: {
            type: Datatypes.TEXT
        },
        person_in_contact: {
            type: Datatypes.STRING
        },
        date: {
            type: Datatypes.DATE,
        },
        other_date: {
            type: Datatypes.DATE,
        },
        other_signature: {
            type: Datatypes.TEXT
        },
        user_id: {
            foreignKey: true,
            type: Datatypes.INTEGER,
            isInt: true
        }
    })
};