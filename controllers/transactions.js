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

    const data = {
        transactions: allTransactions,
        daily: {}
    }

        // Get unique tickers in one line
    const ticketArr = [...new Set(allTransactions.map(t => t.ticker))];
    
    console.log(`tickerArr: ${ticketArr.length}`);

    // Fetch all ticker data in parallel
    await Promise.all(ticketArr.map(async (ticker) => {
        console.log(`ticker: ${ticker}`)
        const apiKey = process.env.ALPHA_KEY;
        const fetchStr = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${apiKey}`
        console.log(`fetchStr: ${fetchStr}`);
        
        const apiData = await fetch(fetchStr);
        const apiResponse = await apiData.json();
        data.daily[ticker] = apiResponse["Time Series (Daily)"];
    }));

    console.log(JSON.stringify(data));
    res.json(data);


    // //fetch daily price from finnhub
    // const ticketArr = () => {
    //     for (const transaction of allTransactions) {

    //     }
    // };
    // allTransactions.forEach(async (transaction) => {
    //     const ticker = transaction.ticker;
    //     console.log(`ticker: ${ticker} logical: ${ticketArr.indexOf(ticker)}`)
    //     ticketArr.indexOf(ticker) > 0 ? '' : ticketArr.push(ticker);
    // });

    // console.log(`tickerArr: ${ticketArr.length}`);

    // ticketArr.forEach(async (ticker) => {
    //     console.log(`ticker: ${ticker}`)
    //     const apiKey = process.env.ALPHA_KEY;
    //     const fetchStr = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${apiKey}`
    //     console.log(`fetchStr: ${fetchStr}`);
        
    //     const apiData = await fetch(fetchStr);
    //     const dataJson = await apiData.json();
    //     const dataObj = dataJson["Time Series (Daily)"];
    //     console.log(`dataObj: ${JSON.stringify(dataObj)}`);
    //     data.daily[ticker] = dataObj;
    // });

    // console.log(JSON.stringify(data));
    // res.json(data);
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