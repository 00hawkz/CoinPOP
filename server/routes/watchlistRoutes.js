const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watchlistController');

router.get('/', watchlistController.getWatchlist);
router.post('/', watchlistController.addCoins);
router.post('/delete', watchlistController.deleteCoins);

module.exports = router;
