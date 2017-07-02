const program = require("../bin/trello");
const config = require("../src/config");

module.exports = {
  execute: function(sinon, args) {
    this.stubEnvironmentChecks(sinon);
    args.unshift("node", "trello");
    program(args);
  },
  stubEnvironmentChecks: function(sinon) {
    sinon.stub(config, "ensureConfigExists");
    sinon.stub(config, "ensureApplicationIdSet");
    sinon.stub(config, "ensureAuthTokenSet");
  }
};
