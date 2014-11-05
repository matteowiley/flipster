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
		InstagramService.getUser(accessToken, function(userBody) {
			req.session.user = userBody.data;
			req.session.user.accessToken = accessToken;
			res.redirect('/games');
		});
	},

};

