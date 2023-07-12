const Sequelize = require('sequelize');
const sequelize = require('../util/database');

// create user table
const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
    name: Sequelize.STRING,
    gender:Sequelize.STRING,
    dob:Sequelize.STRING ,
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    phone:{
        type:Sequelize.STRING,
        allowNull:false,
    }, 
    address:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    pincode:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    initialBalance:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    aadharNo:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    panNo:{
        type:Sequelize.STRING,
        allowNull:false,
    }

   
  
})

module.exports = User;