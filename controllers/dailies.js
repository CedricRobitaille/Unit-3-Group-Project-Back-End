const index = async (req, res) => {
    console.log(`Dailies ticker ${req.query.recordCount}`);

    //fetch daily price data from alpha vantage
    const ticker = req.params.ticker;
    // const apiKey = process.env.ALPHA_KEY;
    const baseUrl = `https://query1.finance.yahoo.com/v8/finance/chart/`

    //generate start and end dates
     // const startTimestamp = startTimestamp.setDate(date.getDate());
    const recordCount = req.query.recordCount ? req.query.recordCount : 100;

    const period2 = Math.floor(new Date().getTime()/1000);
    const period1 = period2 - (100 * 24 * 60 * 60);
    const apiData = await fetch(`${baseUrl}${ticker}?period1=${period1}&period2=${period2}&interval=1d`)
    console.log('apiData', apiData);
    
    // const apiData = await fetch(`${baseUrl}${ticker}?period1=${startDate}&period2=${endDate}&interval=1d`);
    const apiDataJSON = await apiData.json();
   
    
    const symbol = apiDataJSON.chart.result[0].meta.symbol; // ex: AAPL
    const longName = apiDataJSON.chart.result[0].meta.longName; // ex: Apple, Inc.
    const previousClose = apiDataJSON.chart.result[0].meta.chartPreviousClose; // ex: 272.95

    //put metrics into arrays
    const timestampArr = apiDataJSON.chart.result[0].timestamp.reverse();
    const closeArr = apiDataJSON.chart.result[0].indicators.quote[0].close.reverse();
    const highArr = apiDataJSON.chart.result[0].indicators.quote[0].high.reverse();
    const lowArr = apiDataJSON.chart.result[0].indicators.quote[0].low.reverse();

    // console.log(`highArr: ${highArr}`);

    //calculate date range for data
    // const recordCount = req.query.recordCount ? req.query.recordCount : 100;

    //filter first x days of data (recordCount)
    const data = {};

    data.symbol = symbol;
    data.longName = longName;
    data.previousClose = previousClose;
    data.values = [] // Root Array of high/low/close values

    for (let i = 0; i < timestampArr.length; i++) {
        const singleTimestamp = {
            timestampId: timestampArr[i],
            high: highArr[i],
            low: lowArr[i],
            close: closeArr[i]
        }
        data.values.push(singleTimestamp)
    }

    console.log(`Data being sent: `, data)
    res.status(200).json(data)


}

module.exports = {
    index
}