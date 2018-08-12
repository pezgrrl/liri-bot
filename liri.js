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

doSomething(command, name)

function doSomething(command, data) {
    console.log(command);

    if (command == "movie-this") {
        movieThis(name)
    } else if (command == "spotify-this-song") {
        spotifyThisSong(name)
    } else if (command == "my-tweets") {
        myTweets()
    }
        
    function movieThis(movieName) {
        console.log("inside movie-this")
        if (movieName === undefined) {
            movieName = "mr nobody";
        }
        request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {
                console.log("* Title of the movie:         " + JSON.parse(body).Title);
                console.log("* Year the movie came out:    " + JSON.parse(body).Year);
                console.log("* IMDB Rating of the movie:   " + JSON.parse(body).imdbRating);
                console.log("* Rotten Tomatoes Rating of the movie:    " + JSON.parse(body).Ratings[1].Value);
                console.log("* Country produced:           " + JSON.parse(body).Country);
                console.log("* Language of the movie:      " + JSON.parse(body).Language);
                console.log("* Plot of the movie:          " + JSON.parse(body).Plot);
                console.log("* Actors in the movie:        " + JSON.parse(body).Actors);

            } else {
                (err) => {
                    return console.log('Error occurred: ' + err);
                }
            }
        });
    }
    
    function spotifyThisSong(songName) {

        spotify.search({
            type: 'track',
            query: songName
        }, function (err, data) {
            if (err) {
                console.log(err);
                return
            }
            var artistsArray = data.tracks.items[0].album.artists;

            var artistsNames = [];

            for (var i = 0; i < artistsArray.length; i++) {
                artistsNames.push(artistsArray[i].name);
            }
            var artists = artistsNames.join(", ");

            console.log("Artist(s): " + artists);
            console.log("Song: " + data.tracks.items[0].name)
            console.log("Spotify Preview URL: " + data.tracks.items[0].preview_url)
            console.log("Album Name: " + data.tracks.items[0].album.name);
        });

    }

    function myTweets() {

        var params = {
            screen_name: "NotARus36809644",
            count: 20
        };
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (error) {
                console.log('Error occurred: ' + error);
            } else {
                console.log("My 20 Most Recent Tweets");
                console.log("");
                for(var i = 0; i < tweets.length; i++) {
                    console.log("( #" + (i + 1) + " )  " + tweets[i].text);
                    console.log("Created:  " + tweets[i].created_at);
                    console.log("");
            }
        }
      });
    
      function doWhatItSays() {

        fs.readFile("random.txt", "utf8", function (err, data) {
            if (err) {
                console.log(err);
            } else {

                var randomArray = data.split(",");

                action = randomArray[0];

                argument = randomArray[1];

                doSomething(action, argument);
            }
        });
    }
    /* Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
        It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
        Feel free to change the text in that document to test out the feature for other commands.
        */
}
}