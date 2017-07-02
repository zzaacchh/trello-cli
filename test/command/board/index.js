const sinon = require("sinon");
const sinonTest = require("sinon-test")(sinon);

const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const expect = chai.expect;
const utils = require("../../../test/utils");

describe("command#board", function() {
  const board = require("../../../command/board/index");

  describe(":add", function() {
    it(
      "should pass through the board name",
      sinonTest(function() {
        const stub = this.stub(board, "add");
        utils.execute(this, ["board:add", "fiora"]);

        const args = stub.args[0];
        expect(stub).to.have.been.calledOnce;
        expect(args[0]).to.equal("fiora");
      })
    );

    it(
      "has sane defaults",
      sinonTest(function() {
        const stub = this.stub(board, "add");
        utils.execute(this, ["board:add", "something"]);

        const args = stub.args[0];
        expect(args[1].description).to.equal(null);
        expect(args[1].ageing).to.equal(undefined);
        expect(args[1].images).to.equal(true);
      })
    );

    [
      ["can set description", "d", "description", "The Grand Duelist"],
      ["can enable card aging", "a", "ageing", true],
      ["can disable card images", "i", "no-images", undefined]
    ].forEach(function(v) {
      it(
        `${v[0]} (-${v[1]})`,
        sinonTest(function() {
          const stub = this.stub(board, "add");
          let command = ["board:add", "test", "-" + v[1]];
          if (v[3]) {
            command.push(v[3]);
          }
          utils.execute(this, command);

          const args = stub.args[0];
          expect(args[1][v[2]]).to.equal(v[3]);
        })
      );

      it(
        `${v[0]} (--${v[2]})`,
        sinonTest(function() {
          const stub = this.stub(board, "add");
          let command = ["board:add", "test", "--" + v[2]];
          if (v[3]) {
            command.push(v[3]);
          }
          utils.execute(this, command);

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
        utils.execute(this, ["board:close", "fiora"]);

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
        utils.execute(this, ["board:show", "fiora"]);

        const args = stub.args[0];
        expect(stub).to.have.been.calledOnce;
        expect(args[0]).to.equal("fiora");
      })
    );

    it(
      "has sane defaults",
      sinonTest(function() {
        const stub = this.stub(board, "show");
        utils.execute(this, ["board:show", "something"]);

        const args = stub.args[0];
        expect(args[1].closed).to.equal(undefined);
      })
    );

    [["can show closed cards", "c", "closed", true]].forEach(function(v) {
      it(
        `${v[0]} (-${v[1]})`,
        sinonTest(function() {
          const stub = this.stub(board, "show");
          let command = ["board:show", "test", "-" + v[1]];
          if (v[3]) {
            command.push(v[3]);
          }
          utils.execute(this, command);

          const args = stub.args[0];
          expect(args[1][v[2]]).to.equal(v[3]);
        })
      );

      it(
        `${v[0]} (--${v[2]})`,
        sinonTest(function() {
          const stub = this.stub(board, "show");
          let command = ["board:show", "test", "--" + v[2]];
          if (v[3]) {
            command.push(v[3]);
          }
          utils.execute(this, command);

          const args = stub.args[0];
          expect(args[1][v[2]]).to.equal(v[3]);
        })
      );
    });
  });

  describe(":labels", function() {
    it(
      "should pass through the board name",
      sinonTest(function() {
        const stub = this.stub(board, "labels");
        utils.execute(this, ["board:labels", "fiora"]);

        const args = stub.args[0];
        expect(stub).to.have.been.calledOnce;
        expect(args[0]).to.equal("fiora");
      })
    );

    it(
      "has sane defaults",
      sinonTest(function() {
        const stub = this.stub(board, "labels");
        utils.execute(this, ["board:labels", "something"]);

        const args = stub.args[0];
        expect(args[1].count).to.equal(undefined);
      })
    );

    [["can enable card counting", "c", "count", true]].forEach(function(v) {
      it(
        `${v[0]} (-${v[1]})`,
        sinonTest(function() {
          const stub = this.stub(board, "labels");
          let command = ["board:labels", "test", "-" + v[1]];
          if (v[3]) {
            command.push(v[3]);
          }
          utils.execute(this, command);

          const args = stub.args[0];
          expect(args[1][v[2]]).to.equal(v[3]);
        })
      );

      it(
        `${v[0]} (--${v[2]})`,
        sinonTest(function() {
          const stub = this.stub(board, "labels");
          let command = ["board:labels", "test", "--" + v[2]];
          if (v[3]) {
            command.push(v[3]);
          }
          utils.execute(this, command);

          const args = stub.args[0];
          expect(args[1][v[2]]).to.equal(v[3]);
        })
      );
    });
  });
});
