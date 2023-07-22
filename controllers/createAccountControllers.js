const Account = require('../models/Account');
//const bcrypt = require('bcryptjs');
// const { generateToken } = require('../jwt');
// const { verifyToken } = require('../jwt');
const jwt = require('jsonwebtoken')
function isStringValid(string){
  if(string === undefined || string.length === 0){
      return true;
  }else{
      return false;
  }
}
function GenerateAccessToken(id, name ){
  return jwt.sign({userId : id , name:name },process.env.JWT_SECRET)
}



const createUserAccount = async (req, res) => {
  try {
    let { name, gender, dob, email, phone, address, pincode, initialBalance, aadharNo, panNo } = req.body;

    if (isStringValid(name) || isStringValid(gender) || isStringValid(dob) || isStringValid(phone) || isStringValid(address) || isStringValid(pincode) || isStringValid(initialBalance) || isStringValid(aadharNo) || isStringValid(panNo)) {
      return res.status(400).send({ message: 'Invalid form details' });
    }

    const user = await Account.create({
      name,
      gender,
      dob,
      email,
      phone,
      address,
      pincode,
      initialBalance,
      aadharNo,
      panNo,
    });

    // Generate JWT token
    const token = GenerateAccessToken(user.id, user.name);

    return res.status(200).send({ message: 'success', data: user, token });
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: 'Failed to create account' });
  }
};


const getAccount = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = verifyToken(token);
    const userId = decodedToken.userId;


    const account = await Account.findOne({ where: { id: userId } });

    if (!account) {
      return res.status(400).send({ message: 'Account not found' });
    }

    return res.status(200).send({ response: account, message: 'success' });
  } catch (err) {
    return res.status(500).send({ error: err });
  }
};

const close = async (req, res) => {
  try {
    console.log('req.user.id ===> ' , req.user.id)
    const account = await Account.findOne({ where: { id: req.user.id} });


    if (!account) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }

   
    account.closed = true;
    await account.save();


    return res.json({ success: true, message: 'Account closed successfully' });
  } catch (error) {
    console.error('Error closing the account:', error);
    return res.status(500).json({ success: false, message: 'An error occurred while closing the account' });
  }
};



module.exports = {
  createUserAccount,
  GenerateAccessToken,
  getAccount ,
  close,

};
