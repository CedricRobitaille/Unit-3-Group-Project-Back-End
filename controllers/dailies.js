const index = async (req, res) => {
    console.log(`Dailies ticker ${req.body.recordCount}`);

    //fetch daily price data from alpha vantage
    const ticker = req.params.ticker;
    // const apiKey = process.env.ALPHA_KEY;
    const baseUrl = `https://query1.finance.yahoo.com/v8/finance/chart/`
    const apiData = await fetch(`${baseUrl}${ticker}`);
    const apiDataJSON = await apiData.json();
   
    //put metrics into arrays
    const timestampArr = apiDataJSON.chart.result[0].timestamp;
    const closeArr = apiDataJSON.chart.result[0].indicators.quote[0].close;
    const highArr = apiDataJSON.chart.result[0].indicators.quote[0].high;
    const lowArr = apiDataJSON.chart.result[0].indicators.quote[0].low;

    console.log(`highArr: ${highArr}`);

    //calculate date range for data
    const recordCount = req.body.recordCount ? req.body.recordCount : 100;

    //filter first x days of data (recordCount)
    const data = {};
    for (let i = 0; i < recordCount; i++) {
        data[timestampArr[i]] = {
            high: highArr[i],
            low: lowArr[i],
            close: closeArr[i]
        }
    }

    res.json(data)


}

module.exports = {
    index
}