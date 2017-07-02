const sinon = require("sinon");
const sinonTest = require("sinon-test")(sinon);

const chai = require("chai");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const expect = chai.expect;
const config = require("../src/config");
const auth = require("../command/auth/index");

describe("auth", function() {
  describe("#set-client", function() {
    it(
      "should write the ID to config",
      sinonTest(function() {
        const writeConfigStub = this.stub(config, "writeConfigValue");
        const authTokenStub = this.stub(config, "ensureAuthTokenSet");
        authTokenStub.throws(new Error("Please set auth token"));
        const consoleStub = this.stub(console, "log");

        auth.setClient("client_id");

        expect(writeConfigStub).to.have.been.calledTwice;

        // First we write the client ID
        const writeConfigArgs = writeConfigStub.args[0];
        expect(writeConfigArgs[0]).to.equal("auth.clientId");
        expect(writeConfigArgs[1]).to.equal("client_id");

        // Then we clear the auth token as it's a new client ID
        const writeTokenArgs = writeConfigStub.args[1];
        expect(writeTokenArgs[0]).to.equal("auth.token");
        expect(writeTokenArgs[1]).to.equal("");

        // Then tell the user it's been written
        expect(consoleStub).to.have.been.calledTwice;
        expect(consoleStub.args[0][0]).to.equal("Client ID set");
        expect(consoleStub.args[1][0]).to.equal("Please set auth token");

        // Finally, trigger the auth token error to tell the user
        // to generate a new token
        expect(authTokenStub).to.have.been.calledOnce;
      })
    );
  });
  describe("#set-token", function() {
    it(
      "should write the token to config",
      sinonTest(function() {
        const writeConfigStub = this.stub(config, "writeConfigValue");
        const consoleStub = this.stub(console, "log");

        auth.setToken("myToken");

        // First we write the client ID
        const writeConfigArgs = writeConfigStub.args[0];
        expect(writeConfigStub).to.have.been.calledOnce;
        expect(writeConfigArgs[0]).to.equal("auth.token");
        expect(writeConfigArgs[1]).to.equal("myToken");

        // Then tell the user it's been written
        const consoleArgs = consoleStub.args[0];
        expect(consoleStub).to.have.been.calledOnce;
        expect(consoleArgs[0]).to.equal("Auth token set");
      })
    );
  });
});
