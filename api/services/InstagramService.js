var gameCount = 0;
var games = {};
var request = require('request');

module.exports = {
    sanatizeData: function(userData) {
    	var newData = {};
    	newData = {
    		'name': userData.username,
    		'id': userData.id
    	} 
    	return newData;
    },
    getUser: function(accessToken, callback) {
	    request('https://api.instagram.com/v1/users/self?access_token=' + accessToken, function(err, resp, body) {
	    	if (!err) {
		    	callback(JSON.parse(body));
	    	} else {
	    		throw new Error(err);
	    	}
		});
	},
    getPhotos: function(userId, accessToken, callback) {
    	request('https://api.instagram.com/v1/users/' + userId+ '/media/recent/?access_token=' + accessToken, function(err, resp, body) {
    		if (!err) {
    			callback(JSON.parse(body));
    		} else {
	    		throw new Error(err);
    		}
		});
    },
    randomPhotos: function(photoData){
    	var photos = [];
    	console.log('length:', photoData.length);
		for (var i = 3; i > 0; i--) {
		  var j = Math.floor(Math.random() * photoData.length);
		  // console.log(j);
		  // console.log(photoData[j]);
		  var photoObject = {
		  	'photoUrl': photoData[j].images.standard_resolution.url,
		  	'instagramId': photoData[j].id
			};
		  photos.push(photoObject);
		  photos.push(photoObject);
		  photoData.splice(j, 1);
		}
		return photos;
    }
};
