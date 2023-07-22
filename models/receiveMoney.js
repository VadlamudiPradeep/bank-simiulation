const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Transaction = sequelize.define('Transaction', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    fromName:Sequelize.STRING,
    amount: Sequelize.STRING,
    transaction: Sequelize.STRING
  });
  

  module.exports = Transaction