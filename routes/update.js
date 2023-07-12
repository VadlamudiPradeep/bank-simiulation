let express = require('express');

let router = express.Router();

let updatedKYC = require('../controllers/updatedKyc');

router.post('/updateKyc' , updatedKYC.updatedKYC);


module.exports = router