var gameCount = 0;
var games = {};


module.exports = {
    sanatizeData: function(userData) {
    	var newData = {};
    	newData[userData.id] = userData.username;
    	return newData;
    },
    randomPhotos: function(photoData){
    	var photos = {};
    	console.log('length:', photoData.length);
		for (var i = 3; i > 0; i--) {
		  var j = Math.floor(Math.random() * photoData.length);
		  // console.log(j);
		  // console.log(photoData[j]);
		  photos[photoData[j].id] = {
		  	'photoUrl': photoData[j].images.standard_resolution.url
		}
		  photoData.pop(j);
		}
		return photos;
    }
};
