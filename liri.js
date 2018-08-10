require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

//Add the code required to import the `keys.js` file and store it in a variable.

var keys = require('./keys.js');
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var name = process.argv[3];

/*
Make it so liri.js can take in one of the following commands:

    * `my-tweets`
    * `spotify-this-song`
    * `movie-this`
    * `do-what-it-says`
    ????????????????
    */
if (command == 'movie-this') {
    console.log(command);
    moviethis(name);

}


function moviethis(movieName) {

    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {


            console.log("* Title of the movie:         " + JSON.parse(body).Title);
            console.log("* Year the movie came out:    " + JSON.parse(body).Year);
            console.log("* IMDB Rating of the movie:   " + JSON.parse(body).imdbRating);
            console.log("* Country produced:           " + JSON.parse(body).Country);
            console.log("* Language of the movie:      " + JSON.parse(body).Language);
            console.log("* Plot of the movie:          " + JSON.parse(body).Plot);
            console.log("* Actors in the movie:        " + JSON.parse(body).Actors);
        }
    });

}

function mytweets() {

    var params = {
        screen_name: "NotARus36809644",
        count: 20
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets[0].text);
        }
    });
    console.log(' ');
    console.log('Last 20 Tweets:')

    // for (var i = 0; i < tweets.length; i++) {
    //     var number = i + 1;
    //     console.log(" ");
    // }
}
var spotifyThisSong = function (songName) {

    if (songName === undefined) {
        songName = "the sign ace of base";
    }

    spotify.search({
        type: 'track',
        query: songName
    }, function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + err);

        } else {
            for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
                if (i === 0) {
                    console.log("Artist(s):     " + data.tracks.items[0].artists[i].name);
                } else {
                    console.log("               " + data.tracks.items[0].artists[i].name);
                }
                console.log("Song:          " + data.tracks.items[0].artists[i].name);
                console.log("Preview Link:  " + data.tracks.items[0].artists[i].preview_url);
                console.log("Album:         " + data.tracks.items[0].artists[i].album.name);
            }

        };
    })
}

function dowhatitsays() {
    /* Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     Feel free to change the text in that document to test out the feature for other commands.
     */
}
if (command == 'my-tweets') {
    console.log(command);
    mytweets();

}