const Sequelize = require('sequelize');
const sequelize = require('../util/database');

// create user table
const update = sequelize.define('update', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type:Sequelize.STRING,
        allowNull: false,
      },
      dob: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mobile: {
        type:Sequelize.STRING,
        allowNull: false,
      },
      adharNo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      panNo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
   
  
})

module.exports = update