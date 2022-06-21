//Import body_parser
const bodyParser = require('body-parser')
//Import the sequelize ORM for SQL
const sequelize = require('./src/db/sequelize')
//Import express
const express = require('express')
//Import Favicon
const favicon = require('serve-favicon')
//Import Morgan
const morgan = require('morgan')
// Use process.env.config_value instead of appConfig because .env file more helpful
require('dotenv').config();
//Call app config which contains all the app configuration
//const { appConfig } = require('./app-config')

//Instanciation of the app using express.js
const app = express()
//Port spectification
const port = process.env.app_port || process.env.

//Flavicon middleware: Use to show icon on navigator
app.use(favicon(__dirname = ('./favicon.ico')))
//Morgan middleware: Use to request status and link on the terminal
app.use(morgan('dev'))
// Body-parser middleware: Use to parse all entry data into json (Text to Json)
app.use(bodyParser.json())

sequelize.initDb().then(db => console.log(`The database was successfully initialized!`))

//Endpoint
require('./src/routes/find_all_record')(app)
require('./src/routes/find_record_by_pk')(app)
require('./src/routes/create_record')(app)
require('./src/routes/update_record')(app)
require('./src/routes/delete_record')(app)
require('./src/routes/sign_in')(app)
require('./src/routes/sign_up')(app)

app.use(({res}) => {
    const message = `Cannot find the requested resources, please try another URL.`
    res.status(404).json({message})
})

// Listen to the port to run the application
app.listen(port, () => console.log(`Notre application est démarrée sur : http://localhost:${port}.`))