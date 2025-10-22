const axios = require('axios');
const WatchlistCoin = require('../models/WatchlistCoin');

exports.getCoinData = async (req, res) => {
  const coinId = req.params.id;
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch coin data' });
  }
};

exports.fetchPrices = async (req, res) => {
  const currency = req.body.currency || 'usd';
  try {
    const coins = await WatchlistCoin.find({ enabled: true });
    if (!coins.length) {
      return res.status(404).json({ message: 'No coins in watchlist' });
    }
    const symbols = coins.map(c => c.symbol.toLowerCase()).join(',');
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${symbols}&vs_currencies=${currency}`);
    
    res.status(200).json({ prices: response.data });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch prices', error: error.message });
  }
};