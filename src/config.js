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
    appKey: "YOURAPIKEY"
  };
  fs.writeFileSync(this.getConfigFilePath(), JSON.stringify(template, null, 4));
};

Config.prototype.ensureConfigExists = function() {
  if (!this.configDirExists()) {
    this.createDefaultConfig();
  }
};

module.exports = new Config();
