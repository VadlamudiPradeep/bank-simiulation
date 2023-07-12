const Account = require('../models/Account');
const Ledger = require('../models/ledger');
const { verifyToken } = require('../jwt');



const ledger = async (req, res) => {
  try {
    let amount = req.body.amount;

    // Verify token
    const token = req.headers.authorization;
    console.log('token ====>' , token);
    console.log('     ')
    const decodedToken = verifyToken(token);

    console.log('decodedToken' , decodedToken)
    console.log('     ')
    const userId = decodedToken.userId;
console.log('userId ===>' , userId)
    let user = await Account.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(401).send({ error: 'User not found' });
    }
    user.initialBalance += parseFloat(amount);
    await user.save();

    let ledgerEntry = await Ledger.create({
      accountId: user.id,
      amount: parseFloat(amount)
    });

    return res.status(200).send({ data: ledgerEntry, message: 'success' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const withdraw =  async(req,res)=>{
  try {
    const { amount} = req.body;

    const token = req.headers.authorization;
    console.log('token ====>' , token);
    console.log('     ')
    const decodedToken = verifyToken(token);

    console.log('decodedToken' , decodedToken)
    console.log('     ')
    const userId = decodedToken.userId;
console.log('userId ===>' , userId)

    // Find the account by user ID from the token
    const account = await Account.findOne({ where: { id: userId } });

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
    const token = req.headers.authorization;
    console.log('token ====>' , token);
    console.log('     ')
    const decodedToken = verifyToken(token);

    console.log('decodedToken' , decodedToken)
    console.log('     ')
    const userId = decodedToken.userId;
console.log('userId ===>' , userId)
  let account = await Account.findOne({where:{id:userId}});
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


const ReceiveMoney = async(req,res)=>{
  try{
    let {fromName , amount} = req.body ;
    const sender = await Account.findOne({where:{name : fromName}});
    const receiver = await  Account.findOne({where:{name : fromName}});
    if (!sender || !receiver) {
      return res.status(404).json({ success: false, message: 'Invalid sender or receiver account' });
    }
  
  
    if (sender.initialBalance <= amount) {
      return res.status(400).json({ success: false, message: 'Insufficient balance' });
    }
  
    sender.update({ initialBalance: sender.initialBalance - amount });
    receiver.update({ initialBalance: receiver.initialBalance + amount });
  
  }catch(err){
    console.log(err)
  }
}

const transactions = async(req,res)=>{
  try{
    const token = req.headers.authorization;
    console.log('token ===>', token);

    const decodedToken = verifyToken(token);
    console.log('decodedToken', decodedToken);

    const userId = decodedToken.userId;
    console.log('userId ===>', userId);
      const ledger = Ledger.findOne({where:{id:userId}})
   if(!ledger) return res.status(401).send({error:'Deposite not found'})
   return res.status(200).send({response : ledger , success:'Transaction is  successfull'})
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