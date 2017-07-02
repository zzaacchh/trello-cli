let config = require("../../src/config");

module.exports = function(token) {
  config.writeConfigValue("auth.clientId", token);
  console.log("Client ID set");
  try {
    config.ensureAuthTokenSet();
  } catch (e) {
    console.log(e.message);
  }
};
