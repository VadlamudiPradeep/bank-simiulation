const Sequelize = require('sequelize');
const sequelize = require('../util/database');


let ledger = sequelize.define('ledger', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    accountId:{
        type:Sequelize.INTEGER , 
        allowNull:false,
    },
    amount :{
        type:Sequelize.STRING,
        allowNull:false
    }
})
module.exports = ledger ; 