// Required packages and functions
require("dotenv").config();
var Keys = require("./keys.js");
var Twitter = require("twitter")
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

// Create variables to hold keys information about Spotify / Twitter
var spotify = new Spotify(Keys.spotify);
var client = new Twitter(Keys.twitter);

// Store user command from process.argv[2] into variable "command"
var command = process.argv[2];
var userInput = process.argv.slice(3).join(" ").trim();

// This function displays the most recent 20 tweets from the user, and the date of those tweets using the Twitter API
function myTweets() {
    var params = { screen_name: '@CarlosM12927691', count: 20 };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                var output = "Tweet: " + '"' + tweets[i].text + '"' + "\nDate: " + tweets[i].created_at + "\n";
                console.log(output);
                fs.appendFile('./log.txt', output + "\n", (error) => {
                    if (error) throw error;
                });
            };

        } else {
            console.log(error);
        };
    });
};

// This function displays information about a song using the Spotify API
function spotifySong(songName) {
    // If there was a name of song given, request data for the song inputted by user
    if (songName) {
        spotify.search({ type: 'track', query: songName }, function (error, data) {
            if (error) {
                return console.log('Error occurred: ' + error);
            } else {
                var output = "Artist(s): " + data.tracks.items[0].artists[0].name + "\nSong name: " + '"' + data.tracks.items[0].name + '"' +
                    "\nPreview link: " + data.tracks.items[0].preview_url + "\nAlbum: " + data.tracks.items[0].album.name + "\n";
                console.log(output);
                fs.appendFile('./log.txt', output + "\n", (error) => {
                    if (error) throw error;
                });
            };
        });
        // If user did not give input for a song, search for Billi Jean by Michael Jackson as default
    } else {
        spotify.search({ type: 'track', query: 'Billie Jean' }, function (error, data) {
            if (error) {
                return console.log('Error occurred: ' + error);
            } else {
                var output = "Artist(s): " + data.tracks.items[0].artists[0].name + "\nSong name: " + '"' + data.tracks.items[0].name + '"' +
                    "\nPreview link: " + data.tracks.items[0].preview_url + "\nAlbum: " + data.tracks.items[0].album.name + "\n";
                console.log(output);
                fs.appendFile('./log.txt', output + "\n", (error) => {
                    if (error) throw error;
                });
            };
        });
    };
};

// This function displays information about a movie using the OMDb API
function movieThis(movieName) {
    // If there was a name of a movie given, request data for the movie inputted by user
    if (movieName) {
        request('http://www.omdbapi.com/?apikey=trilogy&t=' + movieName, function (error, response, body) {
            var jsonObj = JSON.parse(body);
            var output = "Movie name: " + jsonObj.Title + "\nYear released: " + jsonObj.Year + "\nIMDB rating: " + jsonObj.imdbRating +
                "\nRotten Tomatoes rating: " + jsonObj.Ratings[1].Value + "\nCountry of production: " + jsonObj.Country + "\nLanguage: " +
                jsonObj.Language + "\nPlot: " + jsonObj.Plot + "\nActors: " + jsonObj.Actors + "\n";
            console.log(output);
            fs.appendFile('./log.txt', output + "\n", (error) => {
                if (error) throw error;
            });
        });
        // If user did not give input for a movie, search for "Mr. Nobody" as default
    } else {
        request('http://www.omdbapi.com/?apikey=trilogy&t=Mr. Nobody', function (error, response, body) {
            var jsonObj = JSON.parse(body);
            var output = "Movie name: " + jsonObj.Title + "\nYear released: " + jsonObj.Year + "\nIMDB rating: " + jsonObj.imdbRating +
                "\nRotten Tomatoes rating: " + jsonObj.Ratings[1].Value + "\nCountry of production: " + jsonObj.Country + "\nLanguage: " +
                jsonObj.Language + "\nPlot: " + jsonObj.Plot + "\nActors: " + jsonObj.Actors + "\n";
            console.log(output);
            fs.appendFile('./log.txt', output + "\n", (error) => {
                if (error) throw error;
            });
        });
    };
};

// Switch statement that determines what function will run if the case matches the command
switch (command) {
    // If command is 'my-tweets': call myTweets function to display latest 20 tweets and the date of each tweet
    case "my-tweets":
        myTweets();
        break;
    // If command is 'spotify-this-song': call spotifySong function to display song data (will display Billie Jean if no input)
    case "spotify-this-song":
        spotifySong(userInput)
        break;
    // If command is 'movie-this': call movieThis function to display movie data
    case "movie-this":
        movieThis(userInput);
        break;
    // If command is 'do-what-it-says': use fs.readFile method to read data from file, and act upon data read
    case "do-what-it-says":
        fs.readFile('random.txt', "utf8", function (error, data) {
            // Split text into command and input
            var dataArr = data.split(',');
            var fileCommand = dataArr[0];
            var fileInput = dataArr[1];
            // Switch statement to evaluate what the command in the file is
            switch (fileCommand) {
                // If fileCommand is 'my-tweets': call myTweets function to display latest 20 tweets and the date of each tweet
                case "my-tweets":
                    myTweets();
                    break;
                // If fileCommand is 'spotify-this-song': call spotifySong function to display song data (will display Billie Jean if no input)
                case "spotify-this-song":
                    spotifySong(fileInput);
                    break;
                // If fileCommand is 'movie-this': call movieThis function to display movie data
                case "movie-this":
                    movieThis(fileInput);
                    break;
            };
        });
    // Default case, in case user enters an unrecognized command
    default:
        console.log("*Unrecognized command*\nPlease use the following commands after 'node liri':" +
            "\n1. <my-tweets>\n2. <spotify-this-song>\n3. <movie-this>\n4. <do-what-it-says>");
};