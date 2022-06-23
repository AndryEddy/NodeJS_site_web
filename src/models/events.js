module.exports = (sequelize, Datatypes) => {
    return sequelize.define('events_event', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: Datatypes.TEXT,
            allowNull: false,
        },
        photos: {
            type: Datatypes.STRING,
            get() {
                return this.getDataValue('photos').split(',')
            },
            set(photos) {
                this.setDataValue('types', photos.join())
            }
        },
        is_published: {
            type: Datatypes.BOOLEAN,
            defaultValue: false
        }
    })
}