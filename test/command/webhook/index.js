const sinon = require("sinon");
const sinonTest = require("sinon-test")(sinon);

const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const expect = chai.expect;
const program = require("../../../bin/trello");

describe("command#webhook", function() {
  const webhook = require("../../../command/webhook/index");

  describe(":add", function() {
    it(
      "should pass through the board and webhook name",
      sinonTest(function() {
        const stub = this.stub(webhook, "add");
        execute(["webhook:add", "fiora", "https://example.com/webhook"]);

        const args = stub.args[0];
        expect(stub).to.have.been.calledOnce;
        expect(args[0]).to.equal("fiora");
        expect(args[1]).to.equal("https://example.com/webhook");
      })
    );

    it(
      "has sane defaults",
      sinonTest(function() {
        const stub = this.stub(webhook, "add");
        execute(["webhook:add", "fiora", "https://example.com/webhook"]);

        const args = stub.args[0];
        expect(args[2].force).to.equal(undefined);
      })
    );

    [["can force webhook creation", "f", "force", true]].forEach(function(v) {
      it(
        `${v[0]} (-${v[1]})`,
        sinonTest(function() {
          const stub = this.stub(webhook, "add");
          let command = [
            "webhook:add",
            "fiora",
            "https://example.com/webhook",
            "-" + v[1]
          ];
          if (v[3]) {
            command.push(v[3]);
          }
          execute(command);

          const args = stub.args[0];
          expect(args[2][v[2]]).to.equal(v[3]);
        })
      );

      it(
        `${v[0]} (--${v[2]})`,
        sinonTest(function() {
          const stub = this.stub(webhook, "add");
          let command = [
            "webhook:add",
            "fiora",
            "https://example.com/webhook",
            "--" + v[2]
          ];
          if (v[3]) {
            command.push(v[3]);
          }
          execute(command);

          const args = stub.args[0];
          expect(args[2][v[2]]).to.equal(v[3]);
        })
      );
    });
  });

  describe(":delete", function() {
    it(
      "should pass through the webhook ID",
      sinonTest(function() {
        const stub = this.stub(webhook, "delete");
        execute(["webhook:delete", "webhook123"]);

        const args = stub.args[0];
        expect(stub).to.have.been.calledOnce;
        expect(args[0]).to.equal("webhook123");
      })
    );
  });

  describe(":show", function() {
    it(
      "should should call webhook:show with no arguments",
      sinonTest(function() {
        const stub = this.stub(webhook, "show");
        execute(["webhook:show"]);

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
