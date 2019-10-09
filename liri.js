var Spotify = require('node-spotify-api');
var axios = require('axios');
var matchSong = process.argv[2]; 


var spotify = new Spotify({
  id: '6fd7765c3388437ba5c51353af562860',
  secret: '6041502189fe474fb1b21c7dc3e16709'
});
 
spotify
  .search({ type: 'track', query: matchSong })
  .then(function(response) {
      artistName(response.tracks.items);
  })
  .catch(function(err) {
    console.log(err);
  });


  function artistName(answer){
    for (var i = 0; i < 20; i++) {
      console.log('======== RESULT # ' + (i+1) + ' ===================================================================')
      console.log('SONG TITLE ========> ' + answer[i].name);
      console.log('ALBUM =============> ' + answer[i].album.name);
      console.log('POPULARITY ========> ' + answer[i].popularity + '/100');
      console.log('ARTIST/BAND =======> ' + answer[i].artists[0].name);
      console.log('-----// end result //-------------------------------------------------------------------')
      console.log(' ');
    }
  }