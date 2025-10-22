const express = require('express');
const router = express.Router();
const coinController = require('../controllers/coinController');

router.get('/:id', coinController.getCoinData);
router.post('/fetchprices', coinController.fetchPrices);

module.exports = router;
