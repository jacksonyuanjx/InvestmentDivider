# Investment Divider CLI
[![Master Branch Build](https://github.com/jacksonyuanjx/InvestmentDivider/workflows/Checks/badge.svg)](https://github.com/jacksonyuanjx/InvestmentDivider/actions)
![Deployment](https://github.com/jacksonyuanjx/InvestmentDivider/workflows/Deployment/badge.svg)
[![npm](https://img.shields.io/npm/v/investment-divider.svg)](https://www.npmjs.com/package/investment-divider)
[![Known Vulnerabilities](https://snyk.io/test/github/jacksonyuanjx/InvestmentDivider/badge.svg?targetFile=package.json)](https://snyk.io/test/github/jacksonyuanjx/InvestmentDivider?targetFile=package.json)

Investment Divider is a CLI tool built to help you evenly divide an input amount of capital into various investments while maximizing the number of investments made. By using this CLI, you can quickly decide how many shares of each investment to buy if you wish to evenly distribute your capital.


## Table of Contents

- [Features](#features)
- [Install](#install)
- [Usage](#usage)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [License](#license)

## Features
* accepts a given amount of capital as well as various tickers and their current prices

## Install
```bash
npm i investment-divider -g
```
or
```bash
yarn global add investment-divider
```

## Usage
1. Run `divide-investments divide` in your terminal.
2. Follow the prompt that appears and enter the total amount of capital that you'd like to divide.
3. For each investment you're considering:
    * enter the ticker of the investment
    * enter the current price of the investment
4. When all the tickers & prices of all investments are entered, type `q` and hit enter.
5. The output will show you how many shares of each investment to buy and how much of your total capital is allocated towards these investments.

## Maintainers
[@jacksonyuanjx](https://github.com/jacksonyuanjx)

## Contribute
If you'd like to report a bug or wish to request a feature, feel free to create a new issue or PR.

## License
MIT © Jackson Yuan
