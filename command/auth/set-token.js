let config = require("../../src/config");

module.exports = function(token) {
  config.writeConfigValue("auth.token", token);
};
