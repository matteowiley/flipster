/**
 * WebSocket Server Settings
 * (sails.config.sockets)
 *
 * These settings provide transparent access to the options for Sails'
 * encapsulated WebSocket server, as well as some additional Sails-specific
 * configuration layered on top.
 *
 * For more information on sockets configuration, including advanced config options, see:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.sockets.html
 */

module.exports.sockets = {

  onConnect: function(session, socket) {
    socket.on('games/flip', function(flipData) {
      var gameId = flipData.gameId;
      var gameData = GameService.getGame(gameId);
      var flipperId = session.user.id;
      if (flipperId !== gameData.playerTurn.player.id) {
        // throw some error

        return;
      }

      GameService.flipPhoto(gameId, flipData.photoId);
      sails.sockets.blast('games/' + gameId + '/flip', flipData.photoId);
      
      var newTurn = false;
      if (GameService.bothFlipped(gameId)) {
        newTurn = true;
        var matchData = GameService.compareFlipped(gameId);
        if (matchData.match) {
          sails.sockets.blast('games/' + gameId + '/match', matchData.photos);
        } else {
          sails.sockets.blast('games/' + gameId + '/miss', matchData.photos);
        }
      }

      GameService.turnCounter(gameId);
      if (newTurn) {
        sails.sockets.blast('games/' + gameId + '/turn', gameData.playerTurn.player.username);
      }
    });

    socket.on('games/playerJoined', function(gameId) {
      var gameData = GameService.getGame(gameId);
      sails.sockets.blast('games/' + gameId + '/playerJoined', gameData);
      if (gameData.playerTurn) {
        sails.sockets.blast('games/' + gameId + '/turn', gameData.playerTurn.player.username);
      }
    });
    
    socket.on('games/playermatch', function(gameId) {
      var gameData = GameService.getGame(gameId);
      if (GameService.flipPhoto(flipData.photoId)) {
        sails.sockets.blast('games/' + gameId + '/match', gameData);
      } else {
        sails.sockets.blast('games/' + gameId + '/miss', gameData);
      }
    });
  },


 
  onDisconnect: function(session, socket) {

  },


};
