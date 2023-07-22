const Sequelize = require('sequelize');
const sequelize = require('../util/database');

let ledger = sequelize.define('Led', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
 
  amount: {
    type: Sequelize.STRING,
    allowNull: false
}

});

module.exports = ledger;
