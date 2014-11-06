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
		// var test = sails.sockets.join(req.socket, 'game/' + gameId + '/flip');
		// console.log(req.socket);
		// setTimeout(function() {
		// 	console.log(req.socket);
		// }, 3000);
		// function(id) {
		// 	console.log('RECEIVED ID: ' + id);
		// });
	},

	'join': function(req, res) {
		var gameId = req.param('id');
		InstagramService.getPhotos(
			req.session.user.id,
			req.session.user.accessToken,
			function(imageBody) {
				photos = InstagramService.randomPhotos(imageBody.data);
		       	GameService.addPlayer(gameId, req.session.user, photos);
				GameService.assignTurn(gameId, 0);
				var game = GameService.getGame(gameId);
				console.log('playerTurn:', game.playerTurn);
				res.redirect('/games/' + gameId);
			}
		);
	},
 
	'create': function(req, res) {
		console.log(req.session.user);
		InstagramService.getPhotos(
			req.session.user.id,
			req.session.user.accessToken,
			function(imageBody) {
				photos = InstagramService.randomPhotos(imageBody.data);
				var gameId = GameService.createGame();
		       	GameService.addPlayer(gameId, req.session.user, photos);
		       	GameService.socketAnnounceGame(gameId);
				console.log('game created!');
				res.redirect('/games/' + gameId);
			}
		);
	}
};
