let _ = require("lodash");
let fs = require("fs");
let path = require("path");

let Config = function() {
  this.configPath;
};

Config.prototype.getHomePath = function() {
  return process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
};

Config.prototype.getConfigDir = function() {
  return path.resolve(this.getHomePath(), ".trello-cli");
};

Config.prototype.getConfigFilePath = function() {
  return path.resolve(this.getConfigDir(), "config.json");
};

Config.prototype.configDirExists = function() {
  return fs.existsSync(this.getConfigDir());
};

Config.prototype.createDefaultConfig = function() {
  const configDir = this.getConfigDir();
  try {
    fs.mkdirSync(configDir, "0700");
  } catch (e) {
    throw new Error("Unable to create folder: " + configDir);
  }

  var template = {
    auth: {
      clientId: "YOURAPIKEY",
      token: "AUTHTOKEN"
    }
  };
  fs.writeFileSync(this.getConfigFilePath(), JSON.stringify(template, null, 4));
};

Config.prototype.ensureConfigExists = function() {
  if (!this.configDirExists()) {
    this.createDefaultConfig();
    throw new Error(
      "Go to https://trello.com/app-key and generate the API key and replace YOURAPIKEY in " +
        this.getConfigFilePath()
    );
  }
};

Config.prototype.ensureApplicationIdSet = function() {
  const config = this.getConfig();
  if (
    !config.auth ||
    !config.auth.clientId ||
    config.auth.clientId === "YOURAPIKEY"
  ) {
    throw new Error("Please run `trello auth:set-client <id>`");
  }
};

Config.prototype.ensureAuthTokenSet = function() {
  const config = this.getConfig();
  if (!config.auth || !config.auth.token || config.auth.token === "AUTHTOKEN") {
    throw new Error("Please run `trello auth:set-token <token>`");
  }
};

Config.prototype.getConfig = function() {
  return JSON.parse(fs.readFileSync(this.getConfigFilePath()));
};

Config.prototype.writeConfig = function(value) {
  return fs.writeFileSync(
    this.getConfigFilePath(),
    JSON.stringify(value, null, 4)
  );
};

Config.prototype.writeConfigValue = function(path, value) {
  let config = this.getConfig();
  config = _.set(config, path, value);
  this.writeConfig(config);
};

module.exports = new Config();
