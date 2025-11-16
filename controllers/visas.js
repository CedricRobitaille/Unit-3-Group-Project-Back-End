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
    const baseUrl = `https://finnhub.io/api/v1/stock/visa-application?`
    console.log(`url: ${baseUrl}symbol=${ticker}&from=${startDate}&to=${endDate}&token=${apiKey}`)
    const apiData = await fetch(`${baseUrl}symbol=${ticker}&from=${startDate}&to=${endDate}&token=${apiKey}`);
    const apiDataJSON = await apiData.json();

    // format data structure 
    const data = {
        ticker: apiDataJSON.data[0].symbol,
        longName: apiDataJSON.data[0].employerName,
        values: [],
    }

    for (let i = 0; i < apiDataJSON.data.length; i++) {
        data.values.push({
            caseNumber: apiDataJSON.data[i].caseNumber,
            visaClass: apiDataJSON.data[i].visaClass,
            jobTitle: apiDataJSON.data[i].jobTitle,
            caseStatus: apiDataJSON.data[i].caseStatus,
            year: apiDataJSON.data[i].year,
            quartere: apiDataJSON.data[i].quarter,
            fullTimePosition: apiDataJSON.data[i].fullTimePosition,
            receivedDate:apiDataJSON.data[i].receivedDate,
            beginDate:apiDataJSON.data[i].beginDate,
            endDate:apiDataJSON.data[i].endDate,
            worksitePostalCode: apiDataJSON.data[i].worksitePostalCode,
            wageRangeFrom: apiDataJSON.data[i].wageRangeFrom,
            wageRangeTo: apiDataJSON.data[i].wageRangeTo,
            wageUnitOfPay: apiDataJSON.data[i].wageUnitOfPay,
            wageLevel: apiDataJSON.data[i].wageLevel,

        })
    }

    console.log(`Data being sent: `, data)
    res.status(200).json(data);

    // res.json(apiDataJSON.data);
}

module.exports = {
    index
}