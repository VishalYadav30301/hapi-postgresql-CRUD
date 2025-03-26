const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('hapi_crud' , 'postgres' , 'Vishal@1',{

    host : 'localhost',
    dialect: 'postgres',
    logging: false ,
});
module.exports = sequelize;

