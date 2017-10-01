var trello = require("../../src/trello");
var cache = require("../../src/cache");
module.exports = async function() {
    let user = await cache.getCurrentUser();
    let orgIds = user.idOrganizations;

    console.log("Updating " + orgIds.length + " orgs");

    orgIds.forEach(function(org) {
        trello.get("/1/organizations/" + org, {}, function(err, data) {
            cache.writeOrganization(org, data);
        });
    });
};
