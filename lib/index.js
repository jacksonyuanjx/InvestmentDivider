const { performance } = require("perf_hooks");
const { underline, green } = require("kleur");
const { getTotalCapital, getTickers } = require("./input");
const { getAssetDistribution } = require("./investment-divider");
const { buildResponse } = require("./response");

/**
 * Initial prompt function. This is the entry point function of the CLI.
 */
const prompt = async () => {
    const totalCapital = await getTotalCapital();
    const tickers = await getTickers();
    if (!Object.keys(tickers).length) return console.log(underline().yellow("You must provide at least one ticker"));

    const startTime = performance.now();
    const { result, sum } = getAssetDistribution(totalCapital, tickers);

    console.log(`Operation took: ${performance.now() - startTime}ms`);
    console.log(buildResponse(result));
    return console.log(green(`The total amount invested is ${underline().yellow(`$${sum}`)} out of the total ${underline().yellow(`$${totalCapital}`)} available.`));
};

module.exports = {
    prompt,
};
