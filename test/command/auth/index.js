const sinon = require("sinon");
const sinonTest = require("sinon-test")(sinon);

const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const expect = chai.expect;
const program = require("../../../bin/trello");

describe("command#auth", function() {
  const auth = require("../../../command/auth/index");

  describe(":set", function() {
    it(
      "should pass through the token",
      sinonTest(function() {
        const stub = this.stub(auth, "set");
        execute(["auth:set", "tokentoken"]);

        const args = stub.args[0];
        expect(stub).to.have.been.calledOnce;
        expect(args[0]).to.equal("tokentoken");
      })
    );
  });
});

function execute(args) {
  args.unshift("node", "trello");
  program(args);
}
