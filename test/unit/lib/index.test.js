const sinon = require("sinon");
const rewire = require("rewire");

const lib = rewire("../../../lib");

describe("The prompt() function", () => {
    const stubs = {};
    const rewireRestores = [];

    beforeEach(async () => {
        stubs.getTotalCapital = sinon.stub().resolves(100);
        stubs.getTickers = sinon.stub().resolves({ A: 10.00 });
        stubs.getAssetDistribution = sinon.stub().returns({ result: {}, sum: 0 });
        stubs.buildResponse = sinon.stub().returns({});

        rewireRestores.push(lib.__set__("getTotalCapital", stubs.getTotalCapital));
        rewireRestores.push(lib.__set__("getTickers", stubs.getTickers));
        rewireRestores.push(lib.__set__("getAssetDistribution", stubs.getAssetDistribution));
        rewireRestores.push(lib.__set__("buildResponse", stubs.buildResponse));

        await lib.prompt();
    });

    afterEach(() => {
        rewireRestores.forEach((restore) => restore());
        sinon.restore();
    });

    it("should call getTotalCapital() once", () => {
        sinon.assert.calledOnce(stubs.getTotalCapital);
    });

    it("should call getTickers() once", () => {
        sinon.assert.calledOnce(stubs.getTickers);
    });

    it("should return if no tickers are returned from getTickers()", () => {
        // TODO:
    });

    it("should call getAssetDistribution() once w/ total capital and tickers", () => {
        sinon.assert.calledOnce(stubs.getAssetDistribution);
        sinon.assert.calledWith(stubs.getAssetDistribution, 100, { A: 10.00 });
    });

    it("should call buildResponse() once with result obj from getAssetDistribution()", () => {
        sinon.assert.calledOnce(stubs.buildResponse);
        sinon.assert.calledWith(stubs.buildResponse, {});
    });
});
