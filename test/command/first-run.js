const sinon = require("sinon");
const sinonTest = require("sinon-test")(sinon);

const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const expect = chai.expect;
const program = require("../../bin/trello");
const config = require("../../src/config");

describe("command#first-run", function() {
  describe("config folder", function() {
    it(
      "should ensure the config folder exists",
      sinonTest(function() {
        let ensureExistsStub = this.stub(config, "ensureConfigExists");
        execute(["invalid:command"]);
        expect(ensureExistsStub).to.have.been.calledOnce;
      })
    );
    it(
      "should error if it couldn't create the config folder",
      sinonTest(function() {
        let ensureExistsStub = this.stub(config, "ensureConfigExists");
        ensureExistsStub.throws("Error creating folder");
        expect(() => execute(["invalid:command"])).to.throw;
      })
    );
  });

  describe("client ID", function() {
    it(
      "should make sure client ID is set",
      sinonTest(function() {
        let ensureAppIdSetStub = this.stub(config, "ensureApplicationIdSet");
        execute(["invalid:command"]);
        expect(ensureAppIdSetStub).to.have.been.calledOnce;
      })
    );
    it(
      "should error if the client ID is not set",
      sinonTest(function() {
        let ensureAppIdSetStub = this.stub(config, "ensureApplicationIdSet");
        ensureAppIdSetStub.throws("Client ID not set");
        expect(() => execute(["invalid:command"])).to.throw;
      })
    );
    it(
      "should not check if client ID is set if the command is auth:set-client",
      sinonTest(function() {
        this.stub(config, "writeConfigValue");
        let ensureAppIdSetStub = this.stub(config, "ensureApplicationIdSet");
        execute(["auth:set-client", "MY_CLIENT_ID"]);
        expect(ensureAppIdSetStub).not.to.have.been.called;
      })
    );
  });

  describe("auth token", function() {
    it(
      "should make sure auth token is set",
      sinonTest(function() {
        let ensureAuthTokenSetStub = this.stub(config, "ensureAuthTokenSet");
        execute(["invalid:command"]);
        expect(ensureAuthTokenSetStub).to.have.been.calledOnce;
      })
    );
    it(
      "should error if the auth token is not set",
      sinonTest(function() {
        let ensureAppIdSetStub = this.stub(config, "ensureAuthTokenSet");
        ensureAppIdSetStub.throws("Auth token not set");
        expect(() => execute(["invalid:command"])).to.throw;
      })
    );
    it(
      "should not check if token is set if the command is auth:set-token",
      sinonTest(function() {
        this.stub(config, "writeConfigValue");
        let ensureAuthTokenSetStub = this.stub(config, "ensureAuthTokenSet");
        execute(["auth:set-token", "MY_TOKEN"]);
        expect(ensureAuthTokenSetStub).not.to.have.been.called;
      })
    );
  });
});

function execute(args) {
  args.unshift("node", "trello");
  program(args);
}
