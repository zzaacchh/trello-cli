const sinon = require("sinon");
const sinonTest = require("sinon-test")(sinon);

const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const expect = chai.expect;

describe("cache", function() {
  const cache = require("../src/cache");

  describe("#org", function() {
    it.only(
      "should call console.log",
      sinonTest(function() {
        const stub = this.stub(console, "log");
        cache.refreshOrgs();

        const args = stub.args[0];
        expect(stub).to.have.been.calledOnce;
        expect(args[0]).to.equal("Building org cache");
      })
    );
  });
});
