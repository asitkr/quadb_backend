const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('quadb', 'root', 'root', {
    host: 'localhost', // Change this to your database host if it's different
    dialect: 'mysql',
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

module.exports = sequelize;