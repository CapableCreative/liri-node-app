require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');

var doWhatItSays = function() {
    fs.readFile('random.txt', 'utf-8', function(err, data) {
        if (err) throw err;
        var dataArray = data.split(",");
        runLiri(dataArray[0], dataArray[1]);
    });
};

var getConcert = function() {
    var nodeArgs = process.argv;
    var artist = "";
    for (var i = 3; i < nodeArgs.length; i ++) {
        if (i > 3 && i < nodeArgs.length) {
            artist = artist + "+" + nodeArgs[i];
        }
        else {
            artist += nodeArgs[i];
        }    
    }
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get(queryUrl).then(function(response) {
        var info = response.data;
        for(var i = 0; i < 3; i++) {
            console.log("Line Up: " + info[i].lineup);
            console.log("Venue: " + info[i].venue.name);
            console.log("City/Country: " + info[i].venue.city + ", " + info[i].venue.country)
            var uglyDate = info[i].datetime;
            var convertedDate = moment(uglyDate).format('l');
            console.log("Date: " + convertedDate);
            console.log("------------------------------------------------------")
        }
    })
};

var getMovie = function() {
    var nodeArgs = process.argv;
    var movieName = "";
    for (var i = 3; i < nodeArgs.length; i ++) {
        if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        }
        else {
            movieName += nodeArgs[i];
        }    
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=3051b031"

    axios.get(queryUrl).then(function(response) {
        var movie = response.data;
        console.log("------------------------------------------------------")
        console.log("Title: " + movie.Title);
        console.log("Year Released: " + movie.Year);
        console.log("IMDB Rating: " + movie.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + movie.Ratings[1].Value);
        console.log("Country Produced: " + movie.Country);
        console.log("Language: " + movie.Language);
        console.log("Plot: " + movie.Plot);
        console.log("Actors: " + movie.Actors);
        console.log("------------------------------------------------------")
    })
    .catch(function(error) {
        console.log(error);
    });
};

var getArtist = function(artist) {
    return artist.name;
}
var getSong = function(songName) { 
var spotify = new Spotify(keys.spotify);
    spotify
    .search({ type: 'track', query: songName, limit: 1 })
    .then(function(response) {
        var songs = response.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log("------------------------------------------------------")
            console.log("Artist: " + songs[i].artists.map(getArtist));
            console.log("Song Name: " + songs[i].name);
            console.log("Album: " + songs[i].album.name);
            console.log("Preview Song: " + songs[i].preview_url);
            console.log("------------------------------------------------------")
        }
    })
    .catch(function(err) {
        console.log(err);
    });
};

var runLiri = function(userDataOne, userDataTwo) {
    switch(userDataOne) {
        case "spotify-this-song" :
            getSong(userDataTwo);
            break;
        case "movie-this" :
            getMovie();
            break;
        case "concert-this" :
            getConcert();
            break;
        case "do-what-it-says" :
            doWhatItSays();
        default:
            console.log("LIRI doesn't seem to know that");
    }
}; 

var getUserData = function() {
    runLiri(process.argv[2], process.argv[3]);
};

getUserData();
