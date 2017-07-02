const sinon = require("sinon");
const sinonTest = require("sinon-test")(sinon);

const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const expect = chai.expect;
const program = require("../../../bin/trello");

describe("command#auth", function() {
  const auth = require("../../../command/auth/index");

  describe(":set-client", function() {
    it(
      "should pass through the token",
      sinonTest(function() {
        const stub = this.stub(auth, "setClient");
        execute(["auth:set-client", "tokentoken"]);

        const args = stub.args[0];
        expect(stub).to.have.been.calledOnce;
        expect(args[0]).to.equal("tokentoken");
      })
    );
  });

  describe(":set-token", function() {
    it(
      "should pass through the token",
      sinonTest(function() {
        const stub = this.stub(auth, "setToken");
        execute(["auth:set-token", "my_auth"]);

        const args = stub.args[0];
        expect(stub).to.have.been.calledOnce;
        expect(args[0]).to.equal("my_auth");
      })
    );
  });
});

function execute(args) {
  args.unshift("node", "trello");
  program(args);
}
