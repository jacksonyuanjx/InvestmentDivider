const { performance } = require("perf_hooks");
const { underline } = require("kleur");
const { getTotalCapital, getTickers } = require("./input");
const { getAssetDistribution } = require("./investment-divider");
const { buildResponse } = require("./response");

const questions = require("./questions");

const prompt = async () => {
    const totalCapital = await getTotalCapital(questions.totalCapitalQues);
    const tickers = await getTickers();
    if (!Object.keys(tickers).length) return console.log(underline().yellow("You must input at least one ticker"));

    const startTime = performance.now();
    const { result, sum } = getAssetDistribution(totalCapital, tickers);

    console.log(`Operation took: ${performance.now() - startTime}ms`);
    console.log(buildResponse(result));
    return console.log(`The total amount invested is $${sum} out of a total of $${totalCapital} available.`);
};

module.exports = {
    prompt,
};
