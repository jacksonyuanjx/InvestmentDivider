
const getAssetDistribution = (totalCapital, tickers) => {
    console.log(totalCapital, tickers)
    let multiple = 0;
    while (Object.values(tickers).reduce((s, val) => s += val*(multiple + 1), 0) <= totalCapital) {
        multiple++;
    }

    const tickersArr = [];
    Object.keys(tickers).forEach((ticker) => tickersArr.push([ticker, tickers[ticker], multiple]));
    tickersArr.sort((a, b) => a[1] - b[1]);

    let sum = Object.values(tickers).reduce((s, val) => s += val*multiple, 0);
    for (let i = 0; i <= tickersArr.length; i++) {
        if (tickersArr[i][1] + sum > totalCapital) break;
        tickersArr[i][2]++;
        sum += tickersArr[i][1]
    }
    return { result: tickersArr, sum };
}

module.exports = {
    getAssetDistribution,
};

/*
* find the greatest common multiple that will allow the total contribution of all the items
still be less than the max amt
* then increment count for each item (going from lowest to highest item val.) until max amt
is reached
*/