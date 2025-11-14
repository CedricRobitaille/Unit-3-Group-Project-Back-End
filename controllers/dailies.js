const index = async (req, res) => {
    console.log(`Dailies ticker ${req.query.recordCount}`);

    //fetch daily price data from alpha vantage
    const ticker = req.params.ticker;
    // const apiKey = process.env.ALPHA_KEY;
    const baseUrl = `https://query1.finance.yahoo.com/v8/finance/chart/`
    const apiData = await fetch(`${baseUrl}${ticker}`);
    const apiDataJSON = await apiData.json();
   
    
    const symbol = apiDataJSON.chart.result[0].meta.symbol; // ex: AAPL
    const longName = apiDataJSON.chart.result[0].meta.longName; // ex: Apple, Inc.
    const previousClose = apiDataJSON.chart.result[0].meta.previousClose; // ex: 272.95

    //put metrics into arrays
    const timestampArr = apiDataJSON.chart.result[0].timestamp;
    const closeArr = apiDataJSON.chart.result[0].indicators.quote[0].close;
    const highArr = apiDataJSON.chart.result[0].indicators.quote[0].high;
    const lowArr = apiDataJSON.chart.result[0].indicators.quote[0].low;

    // console.log(`highArr: ${highArr}`);

    //calculate date range for data
    const recordCount = req.query.recordCount ? req.query.recordCount : 100;

    //filter first x days of data (recordCount)
    const data = {};

    data.symbol = symbol;
    data.longName = longName;
    data.previousClose = previousClose;

    for (let i = 0; i < recordCount; i++) {
        data[timestampArr[i]] = {
            high: highArr[i],
            low: lowArr[i],
            close: closeArr[i]
        }
    }

    console.log(`Data being sent: `, data)
    res.status(200).json(data)


}

module.exports = {
    index
}