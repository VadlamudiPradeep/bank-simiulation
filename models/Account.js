const Sequelize = require('sequelize');
const sequelize = require('../util/database');


let account = sequelize.define('UserAcc', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
   name:Sequelize.STRING,

   
   gender:{
    type:Sequelize.STRING
   },
   dob:{
    type:Sequelize.STRING,
   },
   email:{
    type:Sequelize.STRING,
    allowNull:false,
    unique:true
   },
   phone:{
    type:Sequelize.STRING,
   },
   address:{
    type:Sequelize.STRING,
   },
   pincode:{
    type:Sequelize.STRING,
   },
   initialBalance:{
    type:Sequelize.STRING
   },
   aadharNo:{
    type:Sequelize.STRING,
   },
   panNo:{
    type:Sequelize.STRING
   },
   
})
module.exports = account ; 