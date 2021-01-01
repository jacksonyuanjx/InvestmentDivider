const sinon = require("sinon");
const { expect } = require("chai");
const rewire = require("rewire");

const input = rewire("../../../../lib/input");
const { getTickers, getTotalCapital } = input;
const {
    tickerSymbolQues,
    tickerSymbolQuesEmptyStr,
    tickerSymbolQuesDuplicate,
    totalCapitalQues,
    totalCapitalRetry,
} = require("../../../../lib/questions");

describe("The getTickers() function", () => {
    const stubs = {};
    const rewireRestores = [];

    beforeEach(() => {
        stubs.inquirer = { prompt: sinon.stub() };

        rewireRestores.push(input.__set__("inquirer", stubs.inquirer));
    });

    afterEach(() => {
        sinon.restore();
        stubs.inquirer.prompt.reset();
        rewireRestores.forEach((restore) => restore());
    });

    it("should call inquirer.prompt() with correct question for first call and correct ticker price question", async () => {
        stubs.inquirer.prompt.onCall(0).resolves({ ticker_symbol: "GOOG" });
        stubs.inquirer.prompt.onCall(1).resolves({ ticker_price: 102.43 });
        stubs.inquirer.prompt.onCall(2).resolves({ ticker_symbol: "q" });
        await getTickers();

        sinon.assert.calledWith(stubs.inquirer.prompt.firstCall, tickerSymbolQues);
        sinon.assert.calledWith(stubs.inquirer.prompt.secondCall, {
            type: "number",
            name: "ticker_price",
            message: "What's the current price of GOOG: ",
        });
        sinon.assert.calledWith(stubs.inquirer.prompt.thirdCall, tickerSymbolQues);
        sinon.assert.callCount(stubs.inquirer.prompt, 3);
    });

    it("should call inquirer.prompt() with tickerSymbolQuesEmptyStr if first ticker input is empty string", async () => {
        stubs.inquirer.prompt.onCall(0).resolves({ ticker_symbol: "" });
        stubs.inquirer.prompt.onCall(1).resolves({ ticker_symbol: "q" });
        await getTickers();

        sinon.assert.calledWith(stubs.inquirer.prompt.firstCall, tickerSymbolQues);
        sinon.assert.calledWith(stubs.inquirer.prompt.secondCall, tickerSymbolQuesEmptyStr);
    });

    it("should call inquirer.prompt() once w/ tickerSymbolQuesDuplicate if attempting to add duplicate ticker once", async () => {
        stubs.inquirer.prompt.onCall(0).resolves({ ticker_symbol: "MSFT" });
        stubs.inquirer.prompt.onCall(1).resolves({ ticker_price: 123.45 });
        stubs.inquirer.prompt.onCall(2).resolves({ ticker_symbol: "MSFT" });
        stubs.inquirer.prompt.onCall(3).resolves({ ticker_symbol: "q" });
        await getTickers();

        sinon.assert.calledWith(stubs.inquirer.prompt.getCall(3), tickerSymbolQuesDuplicate);
        sinon.assert.callCount(stubs.inquirer.prompt, 4);
    });

    it("should call inquirer.prompt() w/ tickerSymbolQuesEmptyStr after duplicate input is found and subsequent input is empty string", async () => {
        stubs.inquirer.prompt.onCall(0).resolves({ ticker_symbol: "MSFT" });
        stubs.inquirer.prompt.onCall(1).resolves({ ticker_price: 123.45 });
        stubs.inquirer.prompt.onCall(2).resolves({ ticker_symbol: "MSFT" });
        stubs.inquirer.prompt.onCall(3).resolves({ ticker_symbol: "" });
        stubs.inquirer.prompt.onCall(4).resolves({ ticker_symbol: "q" });
        await getTickers();

        sinon.assert.calledWith(stubs.inquirer.prompt.getCall(4), tickerSymbolQuesEmptyStr);
        sinon.assert.callCount(stubs.inquirer.prompt, 5);
    });

    it("should return correct tickers and their respective prices in object", async () => {
        stubs.inquirer.prompt.onCall(0).resolves({ ticker_symbol: "MSFT" });
        stubs.inquirer.prompt.onCall(1).resolves({ ticker_price: 123.45 });
        stubs.inquirer.prompt.onCall(2).resolves({ ticker_symbol: "GOOG" });
        stubs.inquirer.prompt.onCall(3).resolves({ ticker_price: 102.43 });
        stubs.inquirer.prompt.onCall(4).resolves({ ticker_symbol: "q" });
        const result = await getTickers();

        expect(result).to.be.deep.equal({ MSFT: 123.45, GOOG: 102.43 });
    });
});

describe("The getTotalCapital() function", () => {
    const stubs = {};
    const rewireRestores = [];

    beforeEach(() => {
        stubs.inquirer = { prompt: sinon.stub().resolves({ total_capital_to_divide: 10.00 }) };

        rewireRestores.push(input.__set__("inquirer", stubs.inquirer));
    });

    afterEach(() => {
        sinon.restore();
        rewireRestores.forEach((restore) => restore());
    });

    it("should call inquirer.prompt() with correct default question", async () => {
        await getTotalCapital();
        sinon.assert.calledWith(stubs.inquirer.prompt, totalCapitalQues);
    });

    it("should return correct amount of total capital from inquirer.prompt()", async () => {
        const result = await getTotalCapital();
        expect(result).to.be.equal(10.00);
    });

    it("should call getTotalCapital() recursively if total capital input is NaN", async () => {
        stubs.inquirer.prompt.onCall(0).resolves({ total_capital_to_divide: Number.NaN });
        stubs.inquirer.prompt.onCall(1).resolves({ total_capital_to_divide: 25 });
        const getTotalCapitalSpy = sinon.spy(getTotalCapital);
        const result = await getTotalCapitalSpy();

        expect(result).to.be.equal(25);
        sinon.assert.calledWith(stubs.inquirer.prompt.firstCall, totalCapitalQues);
        sinon.assert.calledWith(stubs.inquirer.prompt.secondCall, totalCapitalRetry);
        sinon.assert.calledOnce(getTotalCapitalSpy);
    });
});
