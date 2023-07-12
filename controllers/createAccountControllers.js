const Account = require('../models/Account');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../jwt');
const { verifyToken } = require('../jwt');

function isStringValid(string){
  if(string === undefined || string.length === 0){
      return true;
  }else{
      return false;
  }
}



const createUserAccount = async (req, res) => {
  try {
    let { name, gender, dob, email, phone, address, pincode, initialBalance, aadharNo, panNo } = req.body;


    const hashedPassword = await bcrypt.hash(req.body.password, 10);

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
      password: hashedPassword,
    });

    // Generate JWT token
    const token = generateToken({ userId: user.id });

    return res.status(200).send({ message: 'success', data: user, token });
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: 'failed' });
  }
};

const getAccount = async (req, res) => {
  try {
    const token = req.headers.authorization;
    console.log('token ===>', token);

    const decodedToken = verifyToken(token);
    console.log('decodedToken', decodedToken);

    const userId = decodedToken.userId;
    console.log('userId ===>', userId);

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
    // const token = req.headers.authorization;
    // console.log('token ===>', token);

    // const decodedToken = verifyToken(token);
    // console.log('decodedToken', decodedToken);

    // const userId = decodedToken.userId;
    // console.log('userId ===>', userId);

    // Find the account by the ID
    const account = await Account.findOne({ where: { id: req.user.accountId} });


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
  getAccount ,
  close,

};
