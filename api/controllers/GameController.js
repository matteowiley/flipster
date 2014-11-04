/**
 * GameController
 *
 * @description :: Server-side logic for managing Games
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	// 'new': function(req, res) {
	// 	var gameId = GameService.createGame(req.params.game);
	// 	res.send({
	// 		gameId: gameId,
	// 		success: true,
	// 		gameData: GameService.getGame(gameId)
	// 	});
	// },
	'index': function(req, res) {
		var allGames = GameService.getGames();
		console.log('allGames:', allGames);
		res.view('games', {
			userId: req.session.user.id,
			games: allGames
		});
	},
	'show': function(req, res) {
		var gameId = req.param('id');
		var game = GameService.getGame(gameId);
		res.view('game', {
			userId: req.session.user.id,
			game: game
		});
	}
};

