const express = require('express');
const router = express.Router();
const predictController = require('../controllers/predictController');

router.post('/', predictController.predict);

module.exports = router;
