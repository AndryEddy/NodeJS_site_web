const { Client } = require('pg')
require('dotenv').config()

//Create new database
const client = new Client({
    host: process.env.db_host,
    user: process.env.db_root_user,
    password: process.env.db_root_password,
    port: process.env.db_port,
})

const createDatabase = async () => {
    try {
        await client.connect()
        await client.query(`CREATE DATABASE ${process.env.db_name}`)
        return true
    } catch (error) {
        console.error(error.stack)
        return false
    } finally {
        await client.end()
    }
}

const InitDb = createDatabase().then((result) => {
    if (result) {
        console.log(`Database created successfully: ${result}`)
    }
    else{
        console.log('ERROR WHEN TRYING TO INITIATE MAIN PROJECT: Esti Website')
    }
})

module.exports = {
    InitDb
}


