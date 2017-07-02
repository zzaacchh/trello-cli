const sinon = require("sinon");
const sinonTest = require("sinon-test")(sinon);

const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const expect = chai.expect;

describe("cache#org", function() {
  const cache = require("../../command/cache/index");

  describe(":foo", function() {
    it(
      "should pass",
      sinonTest(function() {
        expect(true).to.eql(true);
      })
    );
  });
});
