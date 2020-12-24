#!/usr/bin/env node

const { program } = require("commander");
const { version, bin } = require("../package.json");
const { prompt } = require("../lib");

program
    .name(Object.keys(bin)[0])
    .usage("divide")
    .description("Evenly divide investments with given amount of capital.")
    .version(`v${version}`)
    .command("divide")
    .alias("d")
    .action(async () => {
        await prompt();
    });

program.parse(process.argv);
