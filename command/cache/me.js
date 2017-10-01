var trello = require("../../src/trello");
var translations = require("../../src/cache");

module.exports = function() {
    console.log("Updating user");
    trello.get("/1/members/me", {}, function(err, data) {
        if (err){ console.log(err); return; }
        return translations.writeUser("me", data);
    });
};
