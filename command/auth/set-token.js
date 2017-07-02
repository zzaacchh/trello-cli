let config = require("../../src/config");

module.exports = function(token) {
  config.writeConfigValue("auth.token", token);
  console.log("Auth token set");
};
