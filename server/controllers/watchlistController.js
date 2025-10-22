const WatchlistCoin = require('../models/WatchlistCoin');

exports.getWatchlist = async (req, res) => {
  try {
    const coins = await WatchlistCoin.find({ enabled: true });
    if (!coins.length) {
      return res.status(404).json({ message: 'No crypto entered in the watchlist!' });
    }
    res.json({ message: coins });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.addCoins = async (req, res) => {
  const query = req.body;
  if (!query) return res.status(400).json({ message: 'No data provided' });

  try {
    if (Array.isArray(query)) {
      const operations = query.map(coin => ({
        updateOne: {
          filter: { symbol: coin.symbol },
          update: coin,
          upsert: true,
        }
      }));
      await WatchlistCoin.bulkWrite(operations);
      return res.status(200).json({ message: 'Coins added/updated successfully' });
    }

    await WatchlistCoin.findOneAndUpdate(
      { symbol: query.symbol },
      query,
      { upsert: true, new: true });
    res.status(200).json({ message: 'Coin added/updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

exports.deleteCoins = async (req, res) => {
  const query = req.body;
  try {
    if (Array.isArray(query)) {
      const symbols = query.map(c => c.symbol);
      const result = await WatchlistCoin.deleteMany({ symbol: { $in: symbols }});
      return res.status(200).json({ message: `${result.deletedCount} coins removed` });
    }
    const result = await WatchlistCoin.deleteOne({ symbol: query.symbol });
    if (result.deletedCount === 1) {
      return res.status(200).json({ message: 'Coin removed successfully' });
    }
    res.status(404).json({ message: 'Coin not found' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
