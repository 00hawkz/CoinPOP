const axios = require('axios');

function movingAverage(prices, windowSize) {
  if (prices.length < windowSize) return null;
  let sum = 0;
  for (let i = prices.length - windowSize; i < prices.length; i++) {
    sum += prices[i];
  }
  return sum / windowSize;
}

function calculateRSI(prices) {
  let gains = 0;
  let losses = 0;

  for (let i = 1; i < prices.length; i++) {
    let delta = prices[i] - prices[i - 1];
    if (delta > 0) gains += delta;
    else losses -= delta;
  }

  if (gains + losses === 0) return 50;

  let rs = gains / (losses || 1);
  return 100 - 100 / (1 + rs);
}

function linearRegression(prices) {
  const n = prices.length;
  const x = [...Array(n).keys()];
  const y = prices;

  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
  const sumX2 = x.reduce((a, b) => a + b * b, 0);

  const numerator = n * sumXY - sumX * sumY;
  const denominator = n * sumX2 - sumX * sumX;
  if (denominator === 0) return 0;
  return numerator / denominator;
}

exports.predict = async (req, res) => {
  const { coin } = req.body;
  if (!coin) return res.status(400).json({ error: 'Coin name required for prediction' });

  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart`, {
      params: { vs_currency: 'usd', days: 7 }
    });

    const prices = response.data.prices.map(p => p[1]);
    if (prices.length < 7) {
      return res.status(400).json({ error: 'Insufficient price data for prediction' });
    }

    const slope = linearRegression(prices);
    const maShort = movingAverage(prices, 3);
    const maLong = movingAverage(prices, 7);
    const rsi = calculateRSI(prices);

    let decision = 'hold';

    if (slope > 0 && maShort > maLong && rsi < 70) {
      decision = 'buy';
    } else if (slope < 0 && maShort < maLong && rsi > 30) {
      decision = 'sell';
    }

    res.json({
      coin,
      decision,
      slope: slope.toFixed(6),
      maShort: maShort.toFixed(4),
      maLong: maLong.toFixed(4),
      rsi: rsi.toFixed(2)
    });

  } catch (error) {
    res.status(500).json({ error: 'Prediction failed', details: error.message });
  }
};
