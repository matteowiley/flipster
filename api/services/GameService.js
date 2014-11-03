var gameCount = 0;
var games = {};


module.exports = {
    createGame: function(gameData) {
        // console.log(gameData);
        gameData.id = gameCount++;
        games[gameData.id] = gameData;
        return gameData.id;
    },
    getGame: function(gameId) {
        return games[gameId];
    },
    getGames: function () {
        var currentGames = [];
        for (var i in games) {
            currentGames.push(games[i])
        }
        return currentGames;
    },
    destroyGame: function(gameId) {
        delete games[gameId];
    }
};