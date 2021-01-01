const { expect } = require("chai");
const sinon = require("sinon");
const rewire = require("rewire");

const InvestmentDivider = rewire("../../../../lib/investment-divider");
const { getAssetDistribution } = InvestmentDivider;

describe("The getAssetDistribution() function", () => {
    it("should call kleur.underline().yellow() once w/ correct output message if no tickers are passed", () => {
        const yellowStub = sinon.stub();
        const underlineStub = sinon.stub().returns({
            yellow: yellowStub
        });
        const underlineRestore = InvestmentDivider.__set__("underline", underlineStub);
        getAssetDistribution(100.233, {});

        sinon.restore();
        underlineRestore();
        sinon.assert.calledOnce(underlineStub);
        sinon.assert.calledOnceWithExactly(yellowStub, "You must provide at least one ticker");
    });

    it("should return obj w/ array of array of tickers in correct format as 'result' and 0 as 'sum', when totalCapital is 0", () => {
        const result = getAssetDistribution(0, { GOOG: 102.43, MSFT: 123.45 });
        expect(result).to.be.deep.equal({
            result: [
                ["GOOG", 102.43, 0],
                ["MSFT", 123.45, 0]
            ],
            sum: 0
        });
    });

    it("should return correct asset allocation when given totalCapital = 100 and three asset prices of 1, 50, 50", () => {
        const result = getAssetDistribution(100, { A: 1, B: 50, C: 50 });
        expect(result).to.be.deep.equal({
            result: [
                ["A", 1, 50],
                ["B", 50, 1],
                ["C", 50, 0]
            ],
            sum: 100
        });
    });

    it("should return correct asset allocation when given totalCapital = 100 and three asset prices of 50, 50, 1", () => {
        const result = getAssetDistribution(100, { A: 50, B: 50, C: 1 });
        expect(result).to.be.deep.equal({
            result: [
                ["C", 1, 50],
                ["A", 50, 1],
                ["B", 50, 0]
            ],
            sum: 100
        });
    });

    it("should return correct asset allocation when given totalCapital = 752.535 and three asset prices of 50.23, 23.45, 34.50", () => {
        const result = getAssetDistribution(752.535, { A: 50.23, B: 23.45, C: 34.50 });
        expect(result).to.be.deep.equal({
            result: [
                ["B", 23.45, 8],
                ["C", 34.5, 7],
                ["A", 50.23, 6]
            ],
            sum: 730.48
        });
    });
});
