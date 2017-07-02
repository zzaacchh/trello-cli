const sinon = require("sinon");
const sinonTest = require("sinon-test")(sinon);

const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const expect = chai.expect;
const program = require("../../../bin/trello");

describe("command#card", function() {
  const card = require("../../../command/card/index");

  describe(":add", function() {
    it(
      "should pass through the board, list and card name",
      sinonTest(function() {
        const stub = this.stub(card, "add");
        execute(["card:add", "fiora", "garen", "cleaver"]);

        const args = stub.args[0];
        expect(stub).to.have.been.calledOnce;
        expect(args[0]).to.equal("fiora");
        expect(args[1]).to.equal("garen");
        expect(args[2]).to.equal("cleaver");
      })
    );

    it(
      "has sane defaults",
      sinonTest(function() {
        const stub = this.stub(card, "add");
        execute(["card:add", "something", "name", "title"]);

        const args = stub.args[0];
        expect(args[3].description).to.equal(null);
        expect(args[3].position).to.equal("top");
        expect(args[3].labels).to.equal(null);
        expect(args[3].force).to.equal(undefined);
      })
    );

    [
      ["can set description", "d", "description", "Demo Description"],
      ["can set position", "p", "position", "bottom"],
      ["can set labels", "l", "labels", "ABC,DEF"],
      ["can force card creation", "f", "force", true]
    ].forEach(function(v) {
      it(
        `${v[0]} (-${v[1]})`,
        sinonTest(function() {
          const stub = this.stub(card, "add");
          let command = ["card:add", "test", "name", "title", "-" + v[1]];
          if (v[3]) {
            command.push(v[3]);
          }
          execute(command);

          const args = stub.args[0];
          expect(args[3][v[2]]).to.equal(v[3]);
        })
      );

      it(
        `${v[0]} (--${v[2]})`,
        sinonTest(function() {
          const stub = this.stub(card, "add");
          let command = ["card:add", "test", "name", "title", "--" + v[2]];
          if (v[3]) {
            command.push(v[3]);
          }
          execute(command);

          const args = stub.args[0];
          expect(args[3][v[2]]).to.equal(v[3]);
        })
      );
    });
  });

  describe(":show", function() {
    it(
      "should pass through the board and list name",
      sinonTest(function() {
        const stub = this.stub(card, "show");
        execute(["card:show", "fiora", "garen"]);

        const args = stub.args[0];
        expect(stub).to.have.been.calledOnce;
        expect(args[0]).to.equal("fiora");
        expect(args[1]).to.equal("garen");
      })
    );
  });

  describe(":move-all", function() {
    it(
      "should pass through the board, from and to fields",
      sinonTest(function() {
        const stub = this.stub(card, "moveAll");
        execute(["card:move-all", "fiora", "from", "to"]);

        const args = stub.args[0];
        expect(stub).to.have.been.calledOnce;
        expect(args[0]).to.equal("fiora");
        expect(args[1]).to.equal("from");
        expect(args[2]).to.equal("to");
      })
    );

    it(
      "has sane defaults",
      sinonTest(function() {
        const stub = this.stub(card, "moveAll");
        execute(["card:move-all", "something", "name", "title"]);

        const args = stub.args[0];
        expect(args[3].board).to.equal(null);
      })
    );

    [["can set source board", "b", "board", "FromBoard"]].forEach(function(v) {
      it(
        `${v[0]} (-${v[1]})`,
        sinonTest(function() {
          const stub = this.stub(card, "moveAll");
          let command = ["card:move-all", "test", "from", "to", "-" + v[1]];
          if (v[3]) {
            command.push(v[3]);
          }
          execute(command);

          const args = stub.args[0];
          expect(args[3][v[2]]).to.equal(v[3]);
        })
      );

      it(
        `${v[0]} (--${v[2]})`,
        sinonTest(function() {
          const stub = this.stub(card, "moveAll");
          let command = ["card:move-all", "test", "from", "to", "--" + v[2]];
          if (v[3]) {
            command.push(v[3]);
          }
          execute(command);

          const args = stub.args[0];
          expect(args[3][v[2]]).to.equal(v[3]);
        })
      );
    });
  });

  describe(":archive", function() {
    it(
      "should pass through the id",
      sinonTest(function() {
        const stub = this.stub(card, "archive");
        execute(["card:archive", "ABC123"]);

        const args = stub.args[0];
        expect(stub).to.have.been.calledOnce;
        expect(args[0]).to.equal("ABC123");
      })
    );
  });

  describe(":assign", function() {
    it(
      "should pass through the id and user",
      sinonTest(function() {
        const stub = this.stub(card, "assign");
        execute(["card:assign", "ABC123", "1234"]);

        const args = stub.args[0];
        expect(stub).to.have.been.calledOnce;
        expect(args[0]).to.equal("ABC123");
        expect(args[1]).to.equal("1234");
      })
    );
  });

  describe(":unassign", function() {
    it(
      "should pass through the id and user",
      sinonTest(function() {
        const stub = this.stub(card, "unassign");
        execute(["card:unassign", "ABC123", "1234"]);

        const args = stub.args[0];
        expect(stub).to.have.been.calledOnce;
        expect(args[0]).to.equal("ABC123");
        expect(args[1]).to.equal("1234");
      })
    );
  });

  describe(":details", function() {
    it(
      "should pass through the id",
      sinonTest(function() {
        const stub = this.stub(card, "details");
        execute(["card:details", "ABC123"]);

        const args = stub.args[0];
        expect(stub).to.have.been.calledOnce;
        expect(args[0]).to.equal("ABC123");
      })
    );
  });

  describe(":delete", function() {
    it(
      "should pass through the id",
      sinonTest(function() {
        const stub = this.stub(card, "delete");
        execute(["card:delete", "ABC123"]);

        const args = stub.args[0];
        expect(stub).to.have.been.calledOnce;
        expect(args[0]).to.equal("ABC123");
      })
    );
  });

  describe(":move", function() {
    it(
      "should pass through the ID and to fields",
      sinonTest(function() {
        const stub = this.stub(card, "move");
        execute(["card:move", "ABC123", "to"]);

        const args = stub.args[0];
        expect(stub).to.have.been.calledOnce;
        expect(args[0]).to.equal("ABC123");
        expect(args[1]).to.equal("to");
      })
    );

    it(
      "has sane defaults",
      sinonTest(function() {
        const stub = this.stub(card, "move");
        execute(["card:move", "something", "name", "title"]);

        const args = stub.args[0];
        expect(args[2].board).to.equal(null);
        expect(args[2].position).to.equal("top");
      })
    );

    [
      ["can set source board", "b", "board", "FromBoard"],
      ["can set position", "p", "position", "bottom"]
    ].forEach(function(v) {
      it(
        `${v[0]} (-${v[1]})`,
        sinonTest(function() {
          const stub = this.stub(card, "move");
          let command = ["card:move", "test", "to", "-" + v[1]];
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
          const stub = this.stub(card, "move");
          let command = ["card:move", "test", "to", "--" + v[2]];
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

  describe(":mine", function() {
    it(
      "should call the correct method",
      sinonTest(function() {
        const stub = this.stub(card, "mine");
        execute(["card:mine"]);

        const args = stub.args[0];
        expect(stub).to.have.been.calledOnce;
      })
    );

    it(
      "has sane defaults",
      sinonTest(function() {
        const stub = this.stub(card, "mine");
        execute(["card:mine"]);

        const args = stub.args[0];
        expect(args[0].user).to.equal(null);
      })
    );

    [["can select a different user", "u", "user", "bob"]].forEach(function(v) {
      it(
        `${v[0]} (-${v[1]})`,
        sinonTest(function() {
          const stub = this.stub(card, "mine");
          let command = ["card:mine", "-" + v[1]];
          if (v[3]) {
            command.push(v[3]);
          }
          execute(command);

          const args = stub.args[0];
          expect(args[0][v[2]]).to.equal(v[3]);
        })
      );

      it(
        `${v[0]} (--${v[2]})`,
        sinonTest(function() {
          const stub = this.stub(card, "mine");
          let command = ["card:mine", "--" + v[2]];
          if (v[3]) {
            command.push(v[3]);
          }
          execute(command);

          const args = stub.args[0];
          expect(args[0][v[2]]).to.equal(v[3]);
        })
      );
    });
  });
});

function execute(args) {
  args.unshift("node", "trello");
  program(args);
}
