var Trello = require("node-trello");
var config = require("./config");

var c = config.getConfig();
var t = new Trello(c.auth.clientId, c.auth.token);

module.exports = t;
