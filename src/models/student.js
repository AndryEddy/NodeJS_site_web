const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Normal', 'Vol','Electrik','Fée']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('students_student', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true,
            unique: {
                msg: 'The name is already taken!'
            },
            validate: {
                notNull: {msg: 'Please set a name for this student.'}
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: 'HP is numeric fields, please make sure to enter only number.'},
                notNull: {msg: 'Hp is required, please fill it.'},
                min: {
                    args: [0],
                    msg: 'Hp must be equal or superior to 0'
                },
                max: {
                    args: [99],
                    msg: 'HP must be equal or superior to 99'
                }
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,

            validate: {
                isInt: {msg: 'CP is a numeric fields, please make sure to enter only number.'},
                notNull: {msg: 'Cp is required, please fill it.'},
                min: {
                    args: [0],
                    msg: 'Cp must be equal or superior to 0'
                },
                max: {
                    args: [99],
                    msg: 'Cp must be equal or inferior to 99'
                }
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            isUrl: true,
            validate: {
                notNull: {msg: 'Please enter a validate URL.'}
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')
            },
            set(types) {
                this.setDataValue('types', types.join())
            },
            validate: {
                isTypesValid(value) {
                    if(!value){
                        throw new Error('Students must have types!')
                    }
                    if(value.split(',').length > 3){
                        throw new Error('Students could not have more than 3 types')
                    }
                    value.split(',').forEach(type => {
                        if(!validTypes.includes(type)) {
                            throw new Error(`Students types must be in the valid type below: ${validTypes}`)
                        }
                    })
                }
            }
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: true,
    })
};