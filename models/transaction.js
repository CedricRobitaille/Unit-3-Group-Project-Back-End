const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    portfolioId : String,
    ticker : String,
    purchaseDate : Date,
    shareCount : Number,
    purchasePrice : Number
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;