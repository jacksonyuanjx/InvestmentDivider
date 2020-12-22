#!/usr/bin/env node

"use strict";

const { program } = require("commander");
const inquirer = require("inquirer");
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
                message: `Provide the current price of ${tickerAns}: `,
            });
            tickers[tickerAns] = price;
            await _recurse(tickers);
        }
    };

    await _recurse(tickers);
    return tickers;
};

const prompt = async () => {
    const { total_capital_to_divide: totalCapital } = await inquirer.prompt(questions.totalCapitalQues);
    // console.log(totalCapital);
    const tickers = await getTickers();
    // console.log(tickers);
    // TODO: output log message saying computing results?
    const result = getAssetDistribution(totalCapital, tickers);
};

prompt();

// program.parse(process.argv);

// TODO: most of this logic should be in /lib