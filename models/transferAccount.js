const Sequelize = require('sequelize');
const sequelize = require('../util/database');

// create user table
const transferAmount = sequelize.define('transfer', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    toName:Sequelize.STRING,
    amount: Sequelize.FLOAT,
    transaction: Sequelize.STRING
    
   
   
  
})

module.exports = transferAmount 