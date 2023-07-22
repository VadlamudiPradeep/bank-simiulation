const express = require('express');
const router = express.Router();

const ledgerControllers = require('../controllers/ledgerControllers');
const middleware = require('../middleware/auth')


router.post('/DepositMoney',middleware.authenticate , ledgerControllers.ledger);
router.post('/WithdrawMoney' , middleware.authenticate , ledgerControllers.withdraw)
router.get('/getWithdrawMoney' , middleware.authenticate  , ledgerControllers.getWithdraw);

router.post('/Transfer' , middleware.authenticate  , ledgerControllers.TransferMoney)
router.post('/Receive' ,middleware.authenticate , ledgerControllers.ReceiveMoney);

router.get('/transaction' ,middleware.authenticate , ledgerControllers.transactions)

module.exports = router;