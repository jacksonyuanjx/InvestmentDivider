const sinon = require("sinon");
const { expect } = require("chai");
const rewire = require("rewire");

const input = rewire("../../../../lib/input");
const { getTickers, getTotalCapital } = input;
const { totalCapitalQues, totalCapitalRetry } = require("../../../../lib/questions");

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
