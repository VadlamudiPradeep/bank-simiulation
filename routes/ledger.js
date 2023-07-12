const express = require('express');
const router = express.Router();

const ledgerControllers = require('../controllers/ledgerControllers');

router.post('/DepositMoney', ledgerControllers.ledger);
router.post('/WithdrawMoney' , ledgerControllers.withdraw)
router.get('/getWithdrawMoney' , ledgerControllers.getWithdraw);

router.post('/Transfer' , ledgerControllers.TransferMoney)
router.post('/Receive' , ledgerControllers.ReceiveMoney);

router.get('/transaction' , ledgerControllers.transactions)

module.exports = router;