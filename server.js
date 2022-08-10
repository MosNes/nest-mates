//main file and entry point for application

//captures env variables
require('dotenv').config();

//---------------------DEPENDENCIES AND GLOBAL VARIABLES--------------------------------------
const path = require('path');
const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');

//-------------------remove models variable after routes are created and imported-----------------
const models = require('./models');

//handlebars for express
const exphbs = require('express-handlebars');
//create the handlebars object and include the custom helper functions
const hbs = exphbs.create({});
//sessions for express, and connect-session-sequelize to write session data to the db using sequelize
const session = require('express-session');
const { truncate } = require('fs');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: process.env.SESS_SECRET,
    //session expires after 5 mins of inactivity, with a max age of 24hrs
    cookie: {
        expires: 5*60*1000,
        maxAge: 24*60*60*1000
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};


const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//required for users to see static assets in the public folder
app.use(express.static(path.join(__dirname, 'public')));
//required for Express Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
//required to use sessions
app.use(session(sess));

//-----------------------ROUTES-----------------------------------------------------
//uncomment this once routes are created to import them
app.use(routes);

//-----------------------INITIALIZATIONS-----------------------------------------------------

// initialize database connection and start server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening'))
});