let express = require('express');
let router  = express.Router();


let createAcccountControllers = require('../controllers/createAccountControllers');

router.post('/CreateUser' , createAcccountControllers.createUserAccount);
router.get('/getStatement' , createAcccountControllers.getAccount)
router.post('/closeAccount' , createAcccountControllers.close)
module.exports = router;