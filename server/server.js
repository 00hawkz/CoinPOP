const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const watchlistRoutes = require('./routes/watchlistRoutes');
const coinRoutes = require('./routes/coinRoutes');
const predictRoutes = require('./routes/predictRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.set('json spaces', 2);

app.get('/', (req, res) => {
  res.json({ message: 'Status Enabled!' });
});

app.use('/watchlist', watchlistRoutes);
app.use('/coin', coinRoutes);
app.use('/predict', predictRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
