const questions = {
    totalCapitalQues: {
        type: "number",
        name: "total_capital_to_divide",
        message: "What's the total amount of capital you'd like to divide?",
    },
    tickerSymbolQues: {
        type: "input",
        name: "ticker_symbol",
        message: "Provide the ticker of one of the investments (or type 'q' if you're done entering): ",
    },
};

module.exports = questions;