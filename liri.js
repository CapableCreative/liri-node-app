/* Created the following files based on assignment instructions:
    - keys.js - direct spotify np to .env for authentication id & secret
    - .env - obfuscastion of spotify dev credentials
    - NPM Packages:
      -- node-spotify-api
      -- axios
      -- fs
      -- dotenv
*/

// required npm packages - see also package.json for dependencies
var axios = require('axios');
var fs = require('fs');

// setting entered criteria within node (index position 2 and 3 (since 1 is node, and 2 is the application))
var searchType = process.argv[2]; 
var searchTerm = process.argv[3]

// the function determining the sort of search; this should be a switch case, but I set it up as if/else
function liriApp(x) {
  if (x === 'Song' || x === 'song') {
    // Added to allow spotify credentials to be obfuscated via .env
    require("dotenv").config();
    // Added based on node-spotify-api specs
    var keys = require("./keys.js");
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
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
        console.log('= SONG RESULT NUMBER: ' + (i+1) + ' =============================================================================')
        console.log('......... SONG TITLE: ' + answer[i].name);
        console.log('.............. ALBUM: ' + answer[i].album.name);
        console.log('....... RELEASE DATE: ' + answer[i].album.release_date);
        console.log('......... POPULARITY: ' + answer[i].popularity + '/100');
        console.log('........ ARTIST/BAND: ' + answer[i].artists[0].name);
        console.log('------------------------------------------------------------------------------------/ end result ' + (i+1) + ' //');
        console.log(' ');
      }
    }
  }
  else if (x === 'Concert'|| x === 'concert') {
    var bandsTown = "https://rest.bandsintown.com/artists/";
    var sortPlus = "/events?app_id=codingbootcamp";

    axios.get(bandsTown + searchTerm + sortPlus).then(function(response) {
      concertData(response.data);
    });
    function concertData(bandData){
      for (var j = 0; j < bandData.length && j < 20; j++){
        console.log(' ');
        console.log('= CONCERT RESULT NUMBER: ' + (j+1) + ' =============================================================================')
        console.log('_________________ WHERE: ' + bandData[j].venue.country + ': ' + bandData[j].venue.city + ',' + bandData[j].venue.region + ' at ' + bandData[j].venue.name);
        console.log('__________________ WHEN: ' + bandData[j].datetime);
        for (var k = 0; k < bandData[j].lineup.length; k++){
          console.log('___________ PERFORMER '+ (k+1) + ': ' + bandData[j].lineup[k]);
        }
        console.log('------------------------------------------------------------------------------------/ end result ' + (j+1) + ' //');
        console.log(' ');
      }
    }
  }
  else if (x === 'Movie'|| x === 'movie') {
    // Then run a request with axios to the OMDB API with the movie specified
    let movieTitle = "http://www.omdbapi.com/?t=";
    let movieApi = "&y=&plot=short&apikey=trilogy";

    axios.get(movieTitle + searchTerm + movieApi).then(
      function(response) {
        let movieData = response.data;
        console.log(' ');
        console.log('==== DATA FOR TERM: ' + searchTerm + ' =============================================================================');
        console.log(' ');
        console.log('----- MOVIE RESULT: ' + movieData.Title);
        console.log('--- PRODUCTION CO.: ' + movieData.Production);
        console.log('--------- RELEASED: ' + movieData.Released);
        console.log('------- IMDB SCORE: ' + movieData.imdbRating);
        console.log('------ MPAA RATING: ' + movieData.Rated);
        console.log('----------- ACTORS: ' + movieData.Actors);
        console.log('----- PLOT SUMMARY: ' + movieData.Plot);
        console.log(' ');
        console.log('---------------------------------------------------------------------------------/ end data for ' + movieData.Title + ' //');
        console.log(' ');
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  }  
  else {
    console.log('ERROR -- What type of search? Type "Song", "Concert", or "Movie" to define your search type.')
  }
}

// calling the liriApp function to execute based on user entered data
liriApp(searchType);