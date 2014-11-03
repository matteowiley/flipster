/**
 * SignInController
 *
 * @description :: Server-side logic for managing Signincontrollers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var request = require('request');

module.exports = {
	instagramCallback: function(req, res) {
		var accessTokenIndex = req.originalUrl.indexOf('=') + 1;
		var accessToken = req.originalUrl.substring(accessTokenIndex);
		res.redirect('/signin/init?access_token=' + accessToken);
	},
	init: function (req, res) {
		console.log(req.session);
		/** 
		*  Check for  authoraztio code in the URL
		*  If it exists start the game
		*  Otherwise lets authorize :)
		*
		**/
		if (req.param('access_token')) {
			var accessToken = req.param('access_token');
			request('https://api.instagram.com/v1/users/self?access_token=' + accessToken, function(err, resp, body) {
				var userBody = JSON.parse(body);
				owner = InstagramService.sanatizeData(userBody.data);
				request('https://api.instagram.com/v1/users/' + userBody.data.id + '/media/recent/?access_token=' + accessToken, function(err, resp, body) {
					var imageBody = JSON.parse(body);
					req.session.user = {
						id: userBody.data.id,
						accessToken: accessToken
					};
					photos = InstagramService.randomPhotos(imageBody.data);
					console.log(owner, photos);
					// do imageBody stuff here
					var gameId = GameService.createGame({
						photos: photos,
						owner: owner
					});
					console.log('game created!');
					return res.redirect('/games');
				})
			})
		} else {
			// Not authorized go home 
			return res.redirect('/');
		}

		


	}

};

