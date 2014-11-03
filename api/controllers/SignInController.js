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
		/** 
		*  Check for  authoraztio code in the URL
		*  If it exists start the game
		*  Otherwise lets authorize :)
		*
		**/
		if (req.param('access_token')) {
			var accessToken = req.param('access_token');
			console.log(accessToken);
			request('https://api.instagram.com/v1/users/self?access_token=' + accessToken, function(err, resp, body) {
				var body = JSON.parse(body);
				request('https://api.instagram.com/v1/users/' + body.data.id + '/media/recent/?access_token=' + accessToken, function(err, resp, body) {
					var gameId = GameService.createGame(body);
					console.log('game created!');
					return res.redirect('/newgame');
				})
			})
		} else {
			// Not authorized go home 
			return res.redirect('/');
		}

		




		// // console.log('got create!! '+ igCode);
		// var returnedData;
		

		
			
		// 		if (err) {
		// 			console.log('error :(');
		// 			console.log(err)
		// 		} else {
					
		// 			res.view('/newgame');
					
		// 		}
		// 	});
		// });
		// // $.ajax({
		//   url: 'https://api.instagram.com/v1/users/self?' + igCode,
		//   type: 'GET',
		//   dataType: "jsonp",
		//   success: function(data) {
		//   	getUserData(data.data.id);
		//   },
		//   error: function(error) {
		//   	console.log(error);
		//   }
		// });

		// function getUserData(id) {
	 //      $.ajax({
	 //      	  url: 'https://api.instagram.com/v1/users/' + id + '/media/recent/?' + igCode,
		// 	  type: 'GET',
		// 	  dataType: "jsonp",
		// 	  success: function(data) {
		// 	  	returnedData = data.data;
		// 	  	res.render('/newgame', returnedData);
		// 	  },
		// 	  error: function(error) {
		// 	  	console.log(error);
		// 	  }
		// 	});
		// }

		// function randomPhoto (data) {
		// 	var data = data
		// 	for (var i = 5; i > 0; i--) {
		// 	  var j = Math.floor(Math.random() * data.length) + 1;
		// 	  console.log(data[j].link);
		// 	  // $('div').prepend('<img value= ' + data[j].id + 'src=' + data[j].images.standard_resolution.url + ' />');
		// 	  // data.pop(j)
		// 	}
		// };
	}

};

