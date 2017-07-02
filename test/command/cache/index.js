const sinon = require("sinon");
const sinonTest = require("sinon-test")(sinon);

const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const expect = chai.expect;
const utils = require("../../../test/utils");

describe("command#cache", function() {
  const cache = require("../../../command/cache/index");

  describe(":all", function() {
    it(
      "should call cache.all with no parameters",
      sinonTest(function() {
        const stub = this.stub(cache, "all");
        utils.execute(this, ["cache:all"]);

        const args = stub.args[0];
        expect(stub).to.have.been.calledOnce;
      })
    );
  });

  describe(":org", function() {
    it(
      "should call cache.org with no parameters",
      sinonTest(function() {
        const stub = this.stub(cache, "org");
        utils.execute(this, ["cache:org"]);

        const args = stub.args[0];
        expect(stub).to.have.been.calledOnce;
      })
    );
  });
});
