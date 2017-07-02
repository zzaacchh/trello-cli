const sinon = require("sinon");
const sinonTest = require("sinon-test")(sinon);

const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const expect = chai.expect;
const program = require("../../bin/trello");

describe("cache", function() {
  const cache = require("../../command/cache/index");

  describe(":all", function() {
    it(
      "should call cache.all with no parameters",
      sinonTest(function() {
        const stub = this.stub(cache, "all");
        execute(["cache:all"]);

        const args = stub.args[0];
        expect(stub).to.have.been.calledOnce;
      })
    );
  });
});

function execute(args) {
  args.unshift("node", "trello");
  program(args);
}
