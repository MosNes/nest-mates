//for database connection file

//import sequelize constructor from the library
const Sequelize = require('sequelize');

let sequelize;

//if hosted remotely on heroku
if (process.env.JAWSDB_URL) {

    //create connection to remote hosted JAWSDB database
    sequelize = new Sequelize(process.env.JAWSDB_URL);

} else {

// create local connection to database
sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});
}


module.exports = sequelize;