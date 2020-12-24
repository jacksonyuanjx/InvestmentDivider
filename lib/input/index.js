const inquirer = require("inquirer");

const questions = require("../questions");

/**
 * Requests input from user to get the tickers and their current prices.
 */
const getTickers = async () => {
    const tickers = {};
    const _recurse = async () => {
        let tickerSymAns = await inquirer.prompt(questions.tickerSymbolQues);
        while (!tickerSymAns.ticker_symbol.trim()) tickerSymAns = await inquirer.prompt(questions.tickerSymbolQuesEmptyStr);
        while (tickerSymAns.ticker_symbol in tickers) {
            tickerSymAns = await inquirer.prompt(questions.tickerSymbolQuesDuplicate);
            while (!tickerSymAns.ticker_symbol.trim()) tickerSymAns = await inquirer.prompt(questions.tickerSymbolQuesEmptyStr);
        }
        const { ticker_symbol: tickerAns } = tickerSymAns;

        if (tickerAns !== "q") {
            let tickerPriceAns = { ticker_price: NaN };
            while (Number.isNaN(tickerPriceAns.ticker_price)) {
                tickerPriceAns = await inquirer.prompt({
                    type: "number",
                    name: "ticker_price",
                    message: `What's the current price of ${tickerAns}: `,
                });
            }
            tickers[tickerAns] = tickerPriceAns.ticker_price;
            await _recurse();
        }
    };

    await _recurse();
    return tickers;
};

/**
 *  Requests input from user to get the total amount of capital available.
 * @param { Object } question the `totalCapitalQues` object for Inquirer.js
 */
const getTotalCapital = async (question = questions.totalCapitalQues) => {
    const { total_capital_to_divide: totalCapital } = await inquirer.prompt(question);
    return (Number.isNaN(totalCapital)) ? getTotalCapital(questions.totalCapitalRetry) : totalCapital;
};

module.exports = {
    getTickers,
    getTotalCapital,
};
