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
        for (var i = game.photos.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = game.photos[i];
          game.photos[i] = game.photos[j];
          game.photos[j] = temp;
        };
    },

    'assignTurn': function(gameId, playerIndex) {
        var game = this.getGame(gameId);
        if (!game.playerTurn) {
            game.playerTurn = {
                'currentPlayer': playerIndex,
                'turns': 0
            }
        }; 
    },

    'turnCounter': function(gameId) {
        var game = this.getGame(gameId)
        if (game.playerTurn.currentPlayer.turns < 2) {
           game.playerTurn.currentPlayer.turns++;
        } else {
            var playerIndex = game.playerTurn.currentPlayer == 0 ? 1 : 0;
            this.assignTurn(gameId, playerIndex);
        };
    },

    'comparePhotos': function(gameId, photoIndex1, photoIndex2) {
        var game = this.getGame(gameId);
        var photo1 = game.photos[photoIndex1];
        var photo2 = game.photos[photoIndex2];
        return photo1.instagramId == photo2.instagramId;
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