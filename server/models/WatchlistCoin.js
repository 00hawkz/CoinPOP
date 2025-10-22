const mongoose = require('mongoose');

const WatchlistCoinSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
  enabled: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('WatchlistCoin', WatchlistCoinSchema);
