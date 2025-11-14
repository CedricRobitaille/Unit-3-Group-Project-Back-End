const index = async (req, res) => {
    console.log(`Patents ticker: ${req.params.ticker}, recordCount ${req.body.recordCount}`);

    //construct start and end dates 
    const date = new Date();
    console.log(`date: ${date}`);

    // const startTimestamp = startTimestamp.setDate(date.getDate());
    const recordCount = req.body.recordCount ? req.body.recordCount : 100;
    const endDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const startDateRaw = new Date(); 
    startDateRaw.setDate(date.getDate() - recordCount);
    const startDate = `${startDateRaw.getFullYear()}-${startDateRaw.getMonth() + 1}-${startDateRaw.getDate()}`;
    console.log(`startDate: ${startDate}, endDate: ${endDate}`);

    //fetch daily price data from alpha vantage
    const ticker = req.params.ticker;
    const apiKey = process.env.FINNHUB_KEY;
    const baseUrl = `https://finnhub.io/api/v1/stock/visa-application?`
    console.log(`url: ${baseUrl}symbol=${ticker}&from=${startDate}&to=${endDate}&token=${apiKey}`)
    const apiData = await fetch(`${baseUrl}symbol=${ticker}&from=${startDate}&to=${endDate}&token=${apiKey}`);
    const apiDataJSON = await apiData.json();

    res.json(apiDataJSON.data);
}

module.exports = {
    index
}