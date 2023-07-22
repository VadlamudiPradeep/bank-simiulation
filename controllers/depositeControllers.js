

let depositeModule = require('../models/depositeMoney');
let withdraw= require('../models/withdraws')
let User = require('../models/Account')
let Transfer = require('../models/transferAccount');
let Receive = ('../models/receiveMoney')
const sequelize = require('../util/database');
let depositMoney= (req,res)=>{
    let {amount , transaction} = req.body ; 

    depositeModule.create({amount , transaction}).then(response=>{
        return res.status(200).send({message:'success ' , response:response})
    })
    .catch(err=>{
console.log(err)
    })
};

let withdrawMoney = async(req,res)=>{
    try {
        const { amount } = req.body;
        const user = await User.findOne();
        const balance = user.initialBalance;
    
        if (amount > balance) {
          return res.status(400).json({ message: "Insufficient balance" });
        }
    
        const newBalance = balance - amount;
        await user.update({ initialBalance: newBalance });
    
        const withdrawal = await withdraw.create(req.body);
        res.status(201).json({ message: "Money withdrawn successfully" , response : withdrawal });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error withdrawing money" });
      }
}

let transferAmount = async (req, res) => {
    try {
      const { toName, amount, transaction } = req.body;
      const sender = await User.findOne();
      const recipient = await User.findOne({ where: { name: toName } });
  
      if (!recipient) {
        return res.status(400).json({ message: "Recipient not found" });
      }
  
      if (amount > sender.initialBalance) {
        return res.status(400).json({ message: "Insufficient balance" });
      }
  
      const senderBalance = sender.initialBalance - amount;
      const recipientBalance = recipient.initialBalance + amount;
  
      await sequelize.transaction(async (t) => {
        await sender.update({ initialBalance: senderBalance }, { transaction: t });
        await recipient.update({ initialBalance: recipientBalance }, { transaction: t });
        await Transfer.create({ toName, amount, transaction }, { transaction: t });
      });
  
      res.status(201).json({ message: "Money transferred successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error transferring money" });
    }
  };



 
const receiveMoney = async (req, res) => {
    const {fromName ,  amount } = req.body;
 
    try {
      // Update the balance and create the ledger for this transaction
  
      // Update the balance logic (assuming you have a User model)
      const user = await User.findOne({ where: { name: fromName } });
      user.initialBalance += amount;
      await user.save();
  
      // Create the transaction ledger
      const transaction = await Receive.create({
        fromName: fromName,
        amount: amount,
        transaction: 'Receive'
      });
  
      // Send a response indicating success
      res.status(200).json({ message: 'Money received successfully', transaction });
    } catch (error) {
      console.error('Error receiving money:', error);
      // Send an error response
      res.status(500).json({ message: 'Error receiving money' });
    }
  };
  
  

module.exports = {
    depositMoney, 
    withdrawMoney ,
    transferAmount ,
    receiveMoney
}