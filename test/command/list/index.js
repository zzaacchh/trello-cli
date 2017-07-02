const sinon = require("sinon");
const sinonTest = require("sinon-test")(sinon);

const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const expect = chai.expect;
const utils = require("../../../test/utils");

describe("command#list", function() {
  const list = require("../../../command/list/index");

  describe(":add", function() {
    it(
      "should pass through the board and list name",
      sinonTest(function() {
        const stub = this.stub(list, "add");
        utils.execute(this, ["list:add", "fiora", "garen"]);

        const args = stub.args[0];
        expect(stub).to.have.been.calledOnce;
        expect(args[0]).to.equal("fiora");
        expect(args[1]).to.equal("garen");
      })
    );

    it(
      "has sane defaults",
      sinonTest(function() {
        const stub = this.stub(list, "add");
        utils.execute(this, ["list:add", "something", "name"]);

        const args = stub.args[0];
        expect(args[2].position).to.equal("top");
        expect(args[2].force).to.equal(undefined);
      })
    );

    [
      ["can set position", "p", "position", "bottom"],
      ["can force list creation", "f", "force", true]
    ].forEach(function(v) {
      it(
        `${v[0]} (-${v[1]})`,
        sinonTest(function() {
          const stub = this.stub(list, "add");
          let command = ["list:add", "test", "name", "-" + v[1]];
          if (v[3]) {
            command.push(v[3]);
          }
          utils.execute(this, command);

          const args = stub.args[0];
          expect(args[2][v[2]]).to.equal(v[3]);
        })
      );

      it(
        `${v[0]} (--${v[2]})`,
        sinonTest(function() {
          const stub = this.stub(list, "add");
          let command = ["list:add", "test", "name", "--" + v[2]];
          if (v[3]) {
            command.push(v[3]);
          }
          utils.execute(this, command);

          const args = stub.args[0];
          expect(args[2][v[2]]).to.equal(v[3]);
        })
      );
    });
  });

  describe(":show", function() {
    it(
      "should pass through the board name",
      sinonTest(function() {
        const stub = this.stub(list, "show");
        utils.execute(this, ["list:show", "fiora"]);

        const args = stub.args[0];
        expect(stub).to.have.been.calledOnce;
        expect(args[0]).to.equal("fiora");
      })
    );
  });
});
