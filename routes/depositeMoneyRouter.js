let express = require('express');
let router  = express.Router();


let DepositMoneyControllers = require('../controllers/depositeControllers');
let middleware = require('../middleware/auth')

router.post('/DepositMoney',middleware.authenticate, DepositMoneyControllers.depositMoney);
router.post('/WithdrawMoney', DepositMoneyControllers.withdrawMoney);
router.post('/TransferMoney', DepositMoneyControllers.transferAmount);
router.post('/ReceiveMoney', DepositMoneyControllers.receiveMoney);
module.exports = router;