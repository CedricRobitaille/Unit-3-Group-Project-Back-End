const Transaction = require('../models/transaction');

//CREATE
const create = async (req, res) => {
    console.log(`req.body: ${req.body}`);
    const newTransaction = await Transaction.create(req.body)
    //send response to confirm creation
    console.log(`newTransaction: ${newTransaction}`);
    res.json(newTransaction);
}

//READ
const index = async (req, res) => {
    const allTransactions = await Transaction.find();
    console.log(`allTransactions: ${allTransactions}`);
    res.json(allTransactions);
}

const show = async (req, res) => {
    const singleTransaction = await Transaction.findById(req.params.transactionId);
    console.log(`singleTransaction: ${singleTransaction}`);
    res.json(singleTransaction);
}

//UPDATE
const update = async (req, res) => {
    await Transaction.findByIdAndUpdate(req.params.transactionId, req.body);
    const updatedTransaction = await Transaction.findById(req.params.transactionId);
    console.log(`updatedTransaction: ${updatedTransaction}`);
    res.json(updatedTransaction);
}

//DELETE
const deleteTransaction = async (req, res) => {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.transactionId)
    console.log(`deletedTransaction: ${deletedTransaction}`);
    res.json(deletedTransaction);
}

module.exports = {
    create,
    index,
    show,
    update,
    deleteTransaction,
};