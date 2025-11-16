const index = async (req, res) => {
    console.log(`Patents ticker: ${req.params.ticker}, recordCount ${req.query.recordCount}`);

    //construct start and end dates 
    const date = new Date();
    console.log(`date: ${date}`);

    // const startTimestamp = startTimestamp.setDate(date.getDate());
    const recordCount = req.query.recordCount ? req.query.recordCount : 100;
    const endDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const startDateRaw = new Date(); 
    startDateRaw.setDate(date.getDate() - recordCount);
    const startDate = `${startDateRaw.getFullYear()}-${startDateRaw.getMonth() + 1}-${startDateRaw.getDate()}`;
    console.log(`startDate: ${startDate}, endDate: ${endDate}`);

    //fetch daily price data from alpha vantage
    const tickerParam = req.params.ticker;
    const apiKey = process.env.FINNHUB_KEY;
    const baseUrl = `https://finnhub.io/api/v1/stock/lobbying?`
    console.log(`url: ${baseUrl}symbol=${tickerParam}&from=${startDate}&to=${endDate}&token=${apiKey}`)
    const apiData = await fetch(`${baseUrl}symbol=${tickerParam}&from=${startDate}&to=${endDate}&token=${apiKey}`);
    const apiDataJSON = await apiData.json();

    // ticker, country, description, income, expenses, typoe, year
    const data = {
        ticker: apiDataJSON.data[0].symbol,
        longName: apiDataJSON.data[0].name, 
        description: apiDataJSON.data[0].description,
        values: [],
    }

    for(let i=0; i<apiDataJSON.data.length; i++) {
        data.values.push({
            country: apiDataJSON.data[i].country,
            year: apiDataJSON.data[i].year,
            type: apiDataJSON.data[i].type,
            income: apiDataJSON.data[i].income,
            expenses: apiDataJSON.data[i].expenses,
        })
    }

    console.log(`Data being sent: `, data)
    res.status(200).json(data);
}

module.exports = {
    index
}