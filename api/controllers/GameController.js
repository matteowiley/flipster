/**
 * GameController
 *
 * @description :: Server-side logic for managing Games
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	'new': function(req, res) {
		var gameId = GameService.createGame(req.params.game);
		res.send({
			gameId: gameId,
			success: true,
			gameData: GameService.getGame(gameId)
		});
	},
	'gameList': function(req, res) {
		
	}
};

