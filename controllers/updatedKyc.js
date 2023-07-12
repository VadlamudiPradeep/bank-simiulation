const updatedAccount = require('../models/updatedKyc');

const updatedKYC = async (req, res) => {
  try {
    // Extract the KYC data from the request body
    const { name, dob, email, mobile, adharNo, panNo } = req.body;
    const bankAccount = await updatedAccount.create({
      name,
      dob,
      email,
      mobile,
      adharNo,
      panNo,
    });

    // Respond with a success message and the inserted data
    res.json({ message: 'KYC information updated successfully', data: bankAccount });
  } catch (error) {
    console.error('Error updating KYC information:', error);
    // Respond with an error message
    res.status(500).json({ error: 'An error occurred while updating KYC information' });
  }
};

module.exports = { updatedKYC };
