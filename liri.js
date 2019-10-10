var Spotify = require('node-spotify-api');
var axios = require('axios');
var fs = require('fs');
var searchType = process.argv[2]; 
var searchTerm = process.argv[3]

function Liri(x) {
  if (x === 'Song') {
    var spotify = new Spotify({
      id: '6fd7765c3388437ba5c51353af562860',
      secret: '6041502189fe474fb1b21c7dc3e16709'
    });
    
    spotify
    .search({ type: 'track', query: searchTerm })
    .then(function(response) {
        artistName(response.tracks.items);
    })
    .catch(function(err) {
      console.log(err);
    });
    function artistName(answer){
      for (var i = 0; i < 20; i++) {
        console.log(' ');
        console.log('RESULT NUMBER: ' + (i+1) + ' =============================================================================')
        console.log('........ SONG TITLE: ' + answer[i].name);
        console.log('............. ALBUM: ' + answer[i].album.name);
        console.log('...... RELEASE DATE: ' + answer[i].album.release_date);
        console.log('........ POPULARITY: ' + answer[i].popularity + '/100');
        console.log('....... ARTIST/BAND: ' + answer[i].artists[0].name);
        console.log('-----// end result //-------------------------------------------------------------------')
        console.log(' ');
      }
    }
  }
  else {
    console.log('ERROR -- What type of search? Type "Song", "Concert", or "Movie" to define your search type.')
  }
}

Liri(searchType);