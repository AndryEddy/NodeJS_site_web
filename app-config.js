require('dotenv').config()

exports.appConfig = () => {
    const config = {
        db_name:'solidis',
        db_port:5432,
        db_host:'localhost',
        db_user:'odoov13',
        db_password: 'odoov13',
        app_port:3000
    }
    return config
}