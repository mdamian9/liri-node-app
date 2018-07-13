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

// console.log(spotify);
// console.log(client);

// Store user command from process.argv[2] into variable "command"
var command = process.argv[2];
var nameOfSearch = process.argv.slice(3).join(" ").trim();
console.log(nameOfSearch);

// Switch statement that determines what function will run if the case matches the command
switch (command) {
    // If command is 'my-tweets': run code, then break
    case "my-tweets":
        var params = { screen_name: '@CarlosM12927691', count: 20 };
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error) {
                for (var i = 0; i < tweets.length; i++) {
                    console.log("Tweet: " + '"' + tweets[i].text + '"' + "\nDate: " + tweets[i].created_at + "\n");
                };
            } else {
                console.log(error);
            };
        });
        break;
    // If command is 'spotify-this-song': run code, then break
    case "spotify-this-song":
        // If there was a name of song given, request data for the song inputted by user
        if (nameOfSearch) {
            spotify.search({ type: 'track', query: nameOfSearch }, function (error, data) {
                if (error) {
                    return console.log('Error occurred: ' + error);
                } else {
                    console.log("Artist(s): " + data.tracks.items[0].artists[0].name + "\nSong name: " + '"' + data.tracks.items[0].name + '"' +
                        "\nPreview link: " + data.tracks.items[0].preview_url + "\nAlbum: " + data.tracks.items[0].album.name);
                };
            });
            // If user did not give input for a song, search for Billi Jean by Michael Jackson as default
        } else {
            spotify.search({ type: 'track', query: 'Billie Jean' }, function (error, data) {
                if (error) {
                    return console.log('Error occurred: ' + error);
                } else {
                    console.log("Artist(s): " + data.tracks.items[0].artists[0].name + "\nSong name: " + '"' + data.tracks.items[0].name + '"' +
                        "\nPreview link: " + data.tracks.items[0].preview_url + "\nAlbum: " + data.tracks.items[0].album.name);
                };
            });
        }
        break;
    // If command is 'movie-this': run code, then break
    case "movie-this":
        request('http://www.omdbapi.com/?apikey=trilogy&t=' + nameOfSearch, function (error, response, body) {
            var jsonObj = JSON.parse(body);
            console.log("Movie name: " + jsonObj.Title + "\nYear released: " + jsonObj.Year + "\nIMDB rating: " + jsonObj.imdbRating +
                "\nRotten Tomatoes rating: " + jsonObj.Ratings[1].Value + "\nCountry of production: " + jsonObj.Country + "\nLanguage: " +
                jsonObj.Language + "\nPlot: " + jsonObj.Plot + "\nActors: " + jsonObj.Actors);
        });
        break;
    case "do-what-it-says":
        console.log("do-what-it-says");
        break;
};