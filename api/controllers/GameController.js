/**
 * GameController
 *
 * @description :: Server-side logic for managing Games
 * @help         :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
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
				res.redirect('/games/' + gameId);
			}
		);
	},
 
	'create': function(req, res) {
		InstagramService.getPhotos(
			req.session.user.id,
			req.session.user.accessToken,
			function(imageBody) {
				photos = InstagramService.randomPhotos(imageBody.data);
				var gameId = GameService.createGame();
		       	GameService.addPlayer(gameId, req.session.user, photos);
		       	GameService.socketAnnounceGame(gameId);
				res.redirect('/games/' + gameId);
			}
		);
	}

};
