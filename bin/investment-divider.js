#!/usr/bin/env node

"use strict";

const { program } = require("commander");
const inquirer = require("inquirer");
const boxen = require("boxen");
const { performance } = require("perf_hooks");
const Table = require("cli-table3");
const { getAssetDistribution } = require("../lib/algo");
const questions = require("./questions");
const investmentDividerVersion = require("../package.json").version;
// console.log(investmentDividerVersion);

program
    .version(`v${investmentDividerVersion}`)
    // .arguments('<divide>')
    // .description("Evenly divide investments given capital")
    .action((cmd, env) => {
        // console.log('command:', cmd);
        // console.log('environment:', env || 'no environment given');
    });

const getTickers = async () => {
    const tickers = {};
    const _recurse = async () => {
        const { ticker_symbol: tickerAns } = await inquirer.prompt(questions.tickerSymbolQues);
        if (tickerAns !== "q") {
            // TODO: check for duplicates
            const { ticker_price: price } = await inquirer.prompt({
                type: "number",
                name: "ticker_price",
                message: `What's the current price of ${tickerAns}: `,
            });
            tickers[tickerAns] = price;
            await _recurse();
        }
    };

    await _recurse();
    return tickers;
};

const getTotalCapital = async (question) => {
    const { total_capital_to_divide: totalCapital } = await inquirer.prompt(question);
    return (isNaN(totalCapital)) ? getTotalCapital(questions.totalCapitalRetry) : totalCapital;
};

const answerStyling = {
    padding: 1,
    borderStyle: "round",
    borderColor: "blue",
};

const buildResponse = (result) => {
    const table = new Table({
        head: ["Ticker", "Price ($)", "# of Shares to Buy", "Total Value ($)"],
        style: { head: ["yellow"], border: ["blue"]}
    });
    result.forEach(e => table.push([e[0], e[1], e[2], e[1]*e[2]]));
    return table.toString();
};

const prompt = async () => {
    const totalCapital = await getTotalCapital(questions.totalCapitalQues);
    console.log(totalCapital);
    const tickers = await getTickers();
    if (!Object.keys(tickers).length) return console.log(boxen("You must input at least one ticker", answerStyling));
    // console.log(tickers);
    // TODO: output log message saying computing results?
    const startTime = performance.now();
    const { result, sum } = getAssetDistribution(totalCapital, tickers);
    console.log(`Operation took: ${performance.now() - startTime}ms`);
    console.log(buildResponse(result));
    console.log(`The total amount invested is: $${sum}`);
};

prompt();

// program.parse(process.argv);

// TODO: most of this logic should be in /lib