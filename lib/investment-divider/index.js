const { underline } = require("kleur");

/**
 * Algorithm for evenly dividing the total amount of capital across the investment assets provided.
 * Note: The algorithm will prioritize including lower-priced assets.
 * @param { Number } totalCapital total amount of capital that cannot be exceeded
 * @param { Object } tickers object of tickers as the keys and its current price as values
 */
const getAssetDistribution = (totalCapital, tickers) => {
    if (!Object.keys(tickers).length) return console.log(underline().yellow("You must provide at least one ticker"));

    // Find greatest common multiplier that can be applied to each asset to ensure the sum is <= totalCapital
    let multiple = 0;
    while (Object.values(tickers).reduce((s, val) => s += val * (multiple + 1), 0) <= totalCapital) {
        multiple++;
    }

    const tickersArr = [];
    Object.keys(tickers).forEach((ticker) => tickersArr.push([ticker, tickers[ticker], multiple]));
    tickersArr.sort((a, b) => a[1] - b[1]);

    let sum = Object.values(tickers).reduce((s, val) => s += val * multiple, 0);
    // Continuously add assets that satisfy constraint, scanning in increasing order of value
    while (sum <= totalCapital) {
        const tmp = sum;
        for (let i = 0; i < tickersArr.length; i++) {
            if (tickersArr[i][1] + sum > totalCapital) break;
            tickersArr[i][2]++;
            sum += tickersArr[i][1];
        }
        if (tmp === sum) break;
    }

    return { result: tickersArr, sum };
};

module.exports = {
    getAssetDistribution,
};
