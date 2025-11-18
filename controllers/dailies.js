const index = async (req, res) => {
    console.log(`Dailies ticker ${req.query.recordCount}`);

    //fetch daily price data from alpha vantage
    const ticker = req.params.ticker;
    // const apiKey = process.env.ALPHA_KEY;
    const baseUrl = `https://query1.finance.yahoo.com/v8/finance/chart/`

    //generate start and end dates
     // const startTimestamp = startTimestamp.setDate(date.getDate());
    const recordCount = req.query.recordCount ? req.query.recordCount : 100;

    //fix end date to most recent friday 
    //this will still fail if holiday as the market will be closed
    // const dateToday = new Date();
    // const day = dateToday.getDay();
    // const offset = day === 0 ? -2 : day === 6 ? -1 : 0;
    // const endDate = Math.floor(dateToday.setDate(dateToday.getDate() + offset)/ 1000);
    // console.log(`endDate: ${endDate}, day: ${day}, offset: ${offset}, getDate: ${dateToday.getDate()}, fixed date: ${dateToday.setDate(dateToday.getDate() + offset)}`)
    // const startDate = endDate - (recordCount * 24 * 60 * 60);
    // console.log(`startDate: ${startDate}, endDate: ${endDate}`);
    // console.log(`url: ${baseUrl}${ticker}?period1=${startDate}&period2=${endDate}&interval=1d`)
    // //`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${startDate}&period2=${endDate}&interval=1d`;
    const apiData = await fetch(`${baseUrl}${ticker}`)
    
    // const apiData = await fetch(`${baseUrl}${ticker}?period1=${startDate}&period2=${endDate}&interval=1d`);
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