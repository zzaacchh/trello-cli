const sinon = require("sinon");
const sinonTest = require("sinon-test")(sinon);

const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const expect = chai.expect;
const program = require("../../bin/trello");

describe("board", function() {
  const board = require("../../src/board/index");

  describe(":add", function() {
    it(
      "should pass through the board name",
      sinonTest(function() {
        const stub = this.stub(board, "add");
        execute(["board:add", "fiora"]);

        const args = stub.args[0];
        expect(stub).to.have.been.calledOnce;
        expect(args[0]).to.equal("fiora");
      })
    );

    it(
      "has sane defaults",
      sinonTest(function() {
        const stub = this.stub(board, "add");
        execute(["board:add", "something"]);

        const args = stub.args[0];
        expect(args[1].description).to.equal(null);
        expect(args[1].ageing).to.equal("off");
        expect(args[1].images).to.equal("on");
      })
    );

    [
      ["can set description", "d", "description", "The Grand Duelist"],
      ["can enable card aging", "a", "ageing", "on"],
      ["can disable card images", "i", "images", "off"]
    ].forEach(function(v) {
      it(
        `${v[0]} (-${v[1]})`,
        sinonTest(function() {
          const stub = this.stub(board, "add");
          execute(["board:add", "test", "-" + v[1], v[3]]);

          const args = stub.args[0];
          expect(args[1][v[2]]).to.equal(v[3]);
        })
      );

      it(
        `${v[0]} (--${v[2]})`,
        sinonTest(function() {
          const stub = this.stub(board, "add");
          execute(["board:add", "test", "--" + v[2], v[3]]);

          const args = stub.args[0];
          expect(args[1][v[2]]).to.equal(v[3]);
        })
      );
    });
  });

  describe(":close", function() {
    it(
      "should pass through the board name",
      sinonTest(function() {
        const stub = this.stub(board, "close");
        execute(["board:close", "fiora"]);

        const args = stub.args[0];
        expect(stub).to.have.been.calledOnce;
        expect(args[0]).to.equal("fiora");
      })
    );
  });

  describe(":show", function() {
    it(
      "should pass through the search term",
      sinonTest(function() {
        const stub = this.stub(board, "show");
        execute(["board:show", "fiora"]);

        const args = stub.args[0];
        expect(stub).to.have.been.calledOnce;
        expect(args[0]).to.equal("fiora");
      })
    );

    it(
      "has sane defaults",
      sinonTest(function() {
        const stub = this.stub(board, "show");
        execute(["board:show", "something"]);

        const args = stub.args[0];
        expect(args[1].closed).to.equal("off");
      })
    );
  });
});

function execute(args) {
  args.unshift("node", "trello");
  program(args);
}
