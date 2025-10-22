# CoinPOP
Coinpop is a powerful and modular backend server built with Express.js and MongoDB (via Mongoose) to manage personalized cryptocurrency watchlists and provide insightful price trend predictions using technical analysis.
Features:
-> Personalized Watchlist Management
     - Users can add, view, and remove their favorite cryptocurrencies in a watchlist stored persistently in MongoDB.
-> Live Coin Data Retrieval
     - Fetch detailed coin information using CoinGecko public API.
-> Price Fetching
     - Get up-to-date prices for all coins in the watchlist with support for multiple currencies.
-> Enhanced Prediction Engine
     - Utilizes combined technical indicators—moving averages (3-day & 7-day), Relative Strength Index (RSI), and linear regression trend slope—to generate actionable predictions: buy, sell, or hold. This         multi-metric approach improves prediction accuracy and reliability.

> Clean Modular Architecture
  -Organized with separate controllers, routes, and models, making it easy to maintain and extend.

> Tech Stack:
  - Node.js & Express.js for RESTful API server
  - MongoDB with Mongoose for data persistence
  - Axios for external API integration (CoinGecko)
  - Technical analysis calculations implemented in JavaScript
