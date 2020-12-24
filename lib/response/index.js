const Table = require("cli-table3");

const buildResponse = (result) => {
    const table = new Table({
        head: ["Ticker", "Price ($)", "# of Shares to Buy", "Total Value ($)"],
        style: { head: ["yellow"], border: ["blue"] },
    });
    result.forEach((e) => table.push([e[0], e[1], e[2], e[1] * e[2]]));
    return table.toString();
};

module.exports = {
    buildResponse,
};
