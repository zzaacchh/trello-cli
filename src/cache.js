let fs = require("fs");
let path = require("path");
let config = require("./config");

let __ = {};


__.needsUpdating = function() {
    return true;
}

__.getCurrentUser = async function() {
    return new Promise((resolve, reject) => {
        let target = path.resolve(config.getTranslationsDir(), "users", "me");
        let r = JSON.parse(fs.readFileSync(target));
        let now = Math.round(+(new Date()) / 1000);
        if ((r.last_updated + 300) < now){
            // Trigger a forced update of the user
            // ... somehow
        }

        return resolve(r.content);
    });
}

__.writeCacheFileEntry = function(folder, id, content) {
    let target = path.resolve(config.getTranslationsDir(), folder);

    let r = {};
    try {
        r = JSON.parse(fs.readFileSync(target));
    } catch (e) { }
    if (!r){
        r = {};
    }

    // Set last updated time
    content['last_updated'] = Math.round(+(new Date()) / 1000);
    r[id] = content;
    fs.writeFileSync(target, JSON.stringify(r));
}

__.writeCacheFile = function(folder, id, content) {
    let targetFolder = path.resolve(config.getTranslationsDir(), folder, id);
    fs.writeFileSync(targetFolder, JSON.stringify({
        "last_updated" : Math.round(+(new Date()) / 1000),
        "content": content
    }));
}

__.writeUser = function(id, data) {
  this.ensureDirectoryExists("users");
  return this.writeCacheFile("users", id, data);
};

__.writeOrganization = function(id, data) {
  return this.writeCacheFileEntry("orgs", id, data);
};

__.writeBoard = function(id, data) {
  return this.writeCacheFileEntry("boards", id, data);
};

__.ensureDirectoryExists = function(target) {
  let targetFolder = path.resolve(config.getTranslationsDir(), target);
  if (!fs.existsSync(targetFolder)){
      try {
          fs.mkdirSync(targetFolder, "0700");
      } catch (e) {
          throw new Error("Unable to create folder: " + targetFolder);
      }
  }
}

module.exports = __;
