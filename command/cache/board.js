var trello = require("../../src/trello");
var cache = require("../../src/cache");
module.exports = async function() {
    let user = await cache.getCurrentUser();
    let boardIds = user.idBoards;

    console.log("Updating " + boardIds.length + " boards");

    boardIds.forEach(function(board) {
        trello.get("/1/boards/" + board, {}, function(err, data) {
            cache.writeBoard(board, data);
        });
    });
};
