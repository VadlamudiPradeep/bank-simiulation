let express = require('express');
let router  = express.Router();


let createAcccountControllers = require('../controllers/createAccountControllers');
let middleware  = require('../middleware/auth')

router.post('/CreateUser' , createAcccountControllers.createUserAccount);
router.get('/getStatement' ,middleware.authenticate, createAcccountControllers.getAccount)
router.post('/closeAccount' , middleware.authenticate , createAcccountControllers.close)
module.exports = router;