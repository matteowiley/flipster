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
        game.flipped = [];
        games[game.id] = game;
        return game.id;
    },
    addPlayer: function(gameId, user, photoArray) {
        var game = this.getGame(gameId);
        if (game.players.length < 2) {
            game.players.push(user);
            game.photos = game.photos.concat(photoArray);
        }
        for (var i = 0; i < game.photos.length; i++) {
            game.photos[i].match = false;
        }
        game.photos = _.shuffle(game.photos);
    },

    'assignTurn': function(gameId, playerIndex) {
        var game = this.getGame(gameId);
        var player = game.players[playerIndex];
        if (!game.playerTurn) {
            game.playerTurn = {
                'player': player,
                'turns': 0
            };
            sails.sockets.blast('games/' + gameId + '/turn', player.username);
        } else {
            game.playerTurn.player = player;
            game.playerTurn.turns = 0;
        }
    },

    'turnCounter': function(gameId) {
        var game = this.getGame(gameId)
        console.log("finding game:", gameId, game);
        if (game.playerTurn.turns < 1) {
           game.playerTurn.turns++;
        } else {
            var playerIndex = (game.playerTurn.player == game.players[0]) ? 1 : 0;
            this.assignTurn(gameId, playerIndex);
        };
    },

    'bothFlipped': function(gameId) {
        var game = this.getGame(gameId);
        return game.flipped.length == 2;
    },

    'flipPhoto': function (gameId, photoId) {
        var game = this.getGame(gameId);
        if (game.flipped.length <= 1) {
            if (game.flipped.length == 0 ||
                (game.flipped.length == 1 &&
                game.flipped[0].id != photoId)) {
                game.flipped.push(photoId);
            }
        }
    },

    'getPhotoByIndex': function(gameId, index) {
        var game = this.getGame(gameId);
        return game.photos[index];
    },

    'compareFlipped': function(gameId) {
        var game = this.getGame(gameId);
        var photo1 = game.photos[game.flipped[0]];
        var photo2 = game.photos[game.flipped[1]];
        console.log(photo1.instagramId, 'vs', photo2.instagramId);
        game.flipped = [];
        var match = photo1.instagramId == photo2.instagramId;
        if (match) {
            photo1.match = true;
            photo2.match = true;
        }

        return {
            match: match,
            photos: [photo1, photo2]
        };
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
    
    gameOver: function(gameId) {
        var game = this.getGame(gameId);
        for (var i = 0; i < game.photos.length; i++) {
            if (game.photos[i].match == false) {
                return false;
            }
        }
        return true;
    },

    destroyGame: function(gameId) {
        delete games[gameId];
    }
};