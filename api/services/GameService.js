var gameCount = 0;
var games = {};

module.exports = {
    createGame: function(gameData) {
        games[gameCount] = gameData;
        return gameCount++;
    },
    getGame: function(gameId) {
        return games[gameId];
    },
    destroyGame: function(gameId) {
        delete games[gameId];
    }
};