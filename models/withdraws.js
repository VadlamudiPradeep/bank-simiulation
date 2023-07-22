const Sequelize = require('sequelize');
const sequelize = require('../util/database');

// create user table
const WithDraw = sequelize.define('withdraw', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    amount:{
        type:Sequelize.STRING
    },
    transaction :{
        type:Sequelize.STRING
    }
    
   
   
  
})

module.exports = WithDraw 