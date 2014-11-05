var gameCount = 0;
var games = {};


module.exports = {
    socketAnnounceGame: function(gameId) {
        sails.sockets.blast('games/newGame', this.getGame(gameId));
    },
    createGame: function() {
        // console.log(gameData);
        var game = {};
        game.id = gameCount++;
        game.players = [];
        game.photos = [];
        games[game.id] = game;
        return game.id;
    },
    addPlayer: function(gameId, user, photoArray) {
        var game = this.getGame(gameId);
        if (game.players.length < 2) {
            game.players.push(user);
            game.photos = game.photos.concat(photoArray);
        }
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