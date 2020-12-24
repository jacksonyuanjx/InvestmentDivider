#!/usr/bin/env node

const { program } = require("commander");
const Table = require("cli-table3");
const kleur = require("kleur");
const investmentDividerVersion = require("../package.json").version;
const { prompt } = require("../lib");
// console.log(investmentDividerVersion);

program
    .version(`v${investmentDividerVersion}`)
    // .arguments('<divide>')
    // .description("Evenly divide investments given capital")
    .action((cmd, env) => {
        // console.log('command:', cmd);
        // console.log('environment:', env || 'no environment given');
    });

// const getTickers = async () => {
//     const tickers = {};
//     const _recurse = async () => {
//         let tickerSymAns = await inquirer.prompt(questions.tickerSymbolQues);
//         while (!tickerSymAns.ticker_symbol.trim()) tickerSymAns = await inquirer.prompt(questions.tickerSymbolQuesEmptyStr);
//         while (tickerSymAns.ticker_symbol in tickers) tickerSymAns = await inquirer.prompt(questions.tickerSymbolQuesDuplicate);
//         const { ticker_symbol: tickerAns } = tickerSymAns;

//         if (tickerAns !== "q") {
//             let tickerPriceAns = { ticker_price: NaN };
//             while (isNaN(tickerPriceAns.ticker_price)) {
//                 tickerPriceAns = await inquirer.prompt({
//                     type: "number",
//                     name: "ticker_price",
//                     message: `What's the current price of ${tickerAns}: `,
//                 });
//             }
//             tickers[tickerAns] = tickerPriceAns.ticker_price;
//             await _recurse();
//         }
//     };

//     await _recurse();
//     return tickers;
// };

// const getTotalCapital = async (question) => {
//     const { total_capital_to_divide: totalCapital } = await inquirer.prompt(question);
//     return (isNaN(totalCapital)) ? getTotalCapital(questions.totalCapitalRetry) : totalCapital;
// };

// const buildResponse = (result) => {
//     const table = new Table({
//         head: ["Ticker", "Price ($)", "# of Shares to Buy", "Total Value ($)"],
//         style: { head: ["yellow"], border: ["blue"]}
//     });
//     result.forEach(e => table.push([e[0], e[1], e[2], e[1]*e[2]]));
//     return table.toString();
// };

// const prompt = async () => {
//     const totalCapital = await getTotalCapital(questions.totalCapitalQues);
//     const tickers = await getTickers();
//     if (!Object.keys(tickers).length) return console.log("You must input at least one ticker");
//     // console.log(tickers);
//     // TODO: output log message saying computing results?
//     const startTime = performance.now();
//     const { result, sum } = getAssetDistribution(totalCapital, tickers);

//     console.log(`Operation took: ${performance.now() - startTime}ms`);
//     console.log(buildResponse(result));
//     console.log(`The total amount invested is $${sum} out of a total of $${totalCapital} available.`);
// };

prompt();

// program.parse(process.argv);
