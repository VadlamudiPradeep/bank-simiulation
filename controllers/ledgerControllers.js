const Account = require('../models/Account');
const Ledger = require('../models/ledger');
// const { verifyToken } = require('../jwt');



const ledger = async (req, res) => {
  try {
    let amount = req.body.amount;
console.log('amount : ' ,  amount)
  console.log('res.user.id ===>  ', req.user.id)

    let user = await Account.findOne({ where: { id:req.user.id } });
    if (!user) {
      return res.status(401).send({ error: 'User not found' });
    }
    user.initialBalance += parseFloat(amount);
    await user.save();

    let ledgerEntry = await Ledger.create({
   
      amount: parseFloat(amount),
     userId: req.user.id,
    });

    return res.status(200).send({ response: ledgerEntry, message: 'success' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: 'Internal Server Error' });
  }

};

const withdraw =  async(req,res)=>{
  try {
    const { amount} = req.body;


    const account = await Account.findOne({ where: { id:req.user.id } });

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    // Check if there's sufficient balance for withdrawal
    if (account.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Update the balance
    account.balance -= amount;
    await account.save();

    res.json({ message: 'Withdrawal successful', balance: account.balance });
  } catch (error) {
    console.error('Error withdrawing money:', error);
    res.status(500).json({ error: 'An error occurred while withdrawing money' });
  }

}


const getWithdraw = async(req,res)=>{
  try{

  let account = await Account.findOne({where:{id:req.user.id}});
  if(!account){
    return res.status(400).send({error:'Account not find'})
  }
  return res.status(200).send({balance :account.initialBalance})
  }catch(err){
    return res.status(500).send({error:err})
  }
};


const TransferMoney = async(req,res)=>{
  try{
    const {toName , amount} = req.body ;
 console.log(toName , amount)

const sender = await Account.findOne({ where: { name: toName} });
const receiver = await Account.findOne({ where: { name: toName  } });

if (!sender || !receiver) {
  return res.status(400).json({ success: false, message: 'Invalid sender or receiver account' });
}

if (sender.initialBalance < amount) {
  return res.status(200).json({ success: false, message: 'Insufficient balance' });
}


sender.update({ initialBalance: sender.initialBalance - amount });
receiver.update({ initialBalance: receiver.initialBalance + amount });
  }catch(err){
    return res.status(500).send({error:err})
  }
};


const ReceiveMoney = async (req, res) => {
  try {
    let { fromName, amount ,toName} = req.body;
    console.group( '    ' )
    console.log('fromName:', fromName, 'amount:', amount , 'toName :' , toName);

    const sender = await Account.findOne({ where: { name: fromName } });
    const receiver = await Account.findOne({ where:{name:toName} }); // You need to specify the 'toName' variable to fetch the receiver account. Make sure you have this variable in the request body.

    if (!sender || !receiver) {
      return res.status(404).json({ success: false, message: 'Invalid sender or receiver account' });
    }

    if (sender.initialBalance <= amount) {
      return res.status(400).json({ success: false, message: 'Insufficient balance' });
    }

    sender.update({ initialBalance: sender.initialBalance - amount });
    receiver.update({ initialBalance: receiver.initialBalance + amount });

    // You might want to add a success response here
    return res.status(200).json({ success: true, message: 'Money received successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


const transactions = async(req,res)=>{
  try{
 
      const ledger = Ledger.findOne({where:{id:req.user.id}})
   if(!ledger) return res.status(400).send({error:'Deposite not found'})
   return res.status(200).send({response : ledger , success:'Transaction is  successful'})
  }catch(err){
    return res.status(500).send({error:err})
  }
}


module.exports = { 
  ledger,
  withdraw ,
  getWithdraw,
  TransferMoney,
  ReceiveMoney,
  transactions
};