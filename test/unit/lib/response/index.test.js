const { expect } = require("chai");
const Table = require("cli-table3");

const { buildResponse } = require("../../../../lib/response");

const TABLE_HEADERS = ["Ticker", "Price ($)", "# of Shares to Buy", "Total Value ($)"];
const STYLE = { head: ["yellow"], border: ["blue"] };

describe("The buildResponse() function", () => {
    it("should return table w/ only the correct headers if 'result' array is empty", () => {
        const expected = new Table({ head: TABLE_HEADERS, style: STYLE }).toString();
        const result = buildResponse([]);

        expect(result).to.be.equal(expected);
    });

    it("should return table ", () => {
        const input = [["A", 10.00, 2], ["B", 20.00, 1]];
        const expected = new Table({ head: TABLE_HEADERS, style: STYLE });
        input.forEach((e) => expected.push([e[0], e[1], e[2], e[1] * e[2]]));
        const result = buildResponse(input);

        expect(result).to.be.equal(expected.toString());
    });
});
