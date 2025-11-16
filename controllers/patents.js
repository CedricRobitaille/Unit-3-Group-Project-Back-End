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
    const ticker = req.params.ticker;
    const apiKey = process.env.FINNHUB_KEY;
    const baseUrl = `https://finnhub.io/api/v1/stock/uspto-patent?`
    console.log(`url: ${baseUrl}symbol=${ticker}&from=${startDate}&to=${endDate}&token=${apiKey}`)
    const apiData = await fetch(`${baseUrl}symbol=${ticker}&from=${startDate}&to=${endDate}&token=${apiKey}`);
    const apiDataJSON = await apiData.json();

    // format data structure 
    const data = {
        ticker: ticker,
        longName: apiDataJSON.data[0].companyFilingName[0], 
        values: [],
    }

    for(let i=0; i<apiDataJSON.data.length; i++) {
        data.values.push({
            description: apiDataJSON.data[i].description,
            filingDate: apiDataJSON.data[i].filingDate,
            filingStatus: apiDataJSON.data[i].filingStatus,
            patentNumber: apiDataJSON.data[i].patentNumber,
            patentType: apiDataJSON.data[i].patentType,
            publicationDate: apiDataJSON.data[i].publicationDate,
            url: apiDataJSON.data[i].url,
        })
    }

    console.log(`Data being sent: `, data)
    res.status(200).json(data);

}

module.exports = {
    index
}