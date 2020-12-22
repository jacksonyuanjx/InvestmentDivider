#!/usr/bin/env node

"use strict";

const { program } = require("commander");
const inquirer = require("inquirer");
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
        const answers = await inquirer.prompt(questions[1]);
        if (answers.ticker_symbol !== "q") {
            tickers[answers.ticker_symbol] = 0;
            await _recurse(tickers);
        }
    };

    await _recurse(tickers);
    return tickers;
};

const prompt = async () => {
    const { total_capital_to_divide: totalCapital } = await inquirer.prompt([questions[0]]);
    console.log(totalCapital);
    const tickers = await getTickers();
    console.log(tickers);
    
};

prompt();

// program.parse(process.argv);