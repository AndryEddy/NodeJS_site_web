//Import body_parser
const bodyParser = require('body-parser');

//Import cors
const cors = require('cors');

//Import cookieParser
const cookieParser = require('cookie-parser');

//Import sessions from express
const sessions = require('express-session');

//Import sequelize ORM for SQL
const sequelize = require('./src/db/sequelize');

//Import InitDb to create new database
const { InitDb } = require('./src/db/database');

//Import express
const express = require('express');

//Import Favicon
const favicon = require('serve-favicon');

//Import Morgan
const morgan = require('morgan');

// Use process.env.config_value instead of appConfig because .env file more helpful
require('dotenv').config();


//Instanciation of the app using express.js
const app = express();
const port = process.env.app_port;

//Use 24h cookies
const oneDay = 1000 * 60 * 60 * 24;

//Cors
app.use(cors());

//user sessions
app.use(sessions({
    secret: process.env.sessions_private_key,
    saveUninitialized: true,
    cookie: { maxAge: oneDay},
    resave: false
}));

//Use cookie parser
app.use(cookieParser());

//Favicon middleware: Use to show icon on navigator
app.use(favicon(__dirname = ('./favicon.ico')));

//Morgan middleware: Use to request status and link on the terminal
app.use(morgan('dev'));

// Body-parser middleware: Use to parse all entry data into json (Text to Json)
app.use(bodyParser.json());

//remove comment to use epxress.json()
app.use(express.json());

//Use urlencoded
app.use(
    express.urlencoded({
        extended: true,
    })
);

//Init first db creation and insert default data
InitDb.then(() => {
    sequelize.InitData().then(() => {
        console.log('Database is successfully created and initialized.')
    })
});

//Endpoints
require('./src/routes/find_all_record')(app);
require('./src/routes/find_record_by_pk')(app);
require('./src/routes/create_record')(app);
require('./src/routes/update_record')(app);
require('./src/routes/delete_record')(app);
require('./src/routes/sign_in')(app);
require('./src/routes/sign_up')(app);
require('./src/routes/sign_up_code_validation')(app);
require('./src/routes/sign_in_code_validation')(app);
require('./src/routes/change_password')(app);
require('./src/routes/log_out')(app);
require('./src/routes/gh_commit_view')(app);
require('./src/routes/gh_pullrequests_view')(app);
require('./src/routes/get_album_photos')(app);

app.use(({res}) => {
    const message = `Cannot find the requested resources, please try another URL.`;
    res.status(404).json({message})
});

// Listen to the port to run the application
app.listen(port, () => console.log(`Server is running on: http://localhost:${port}.`));
