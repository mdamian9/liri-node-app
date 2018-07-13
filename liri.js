// Required things
require("dotenv").config();
var Keys = require("./keys.js");
var Twitter = require("twitter")
var Spotify = require("node-spotify-api");
var Request = require("request");

// Create variables to hold keys information about Spotify / Twitter
var spotify = new Spotify(Keys.spotify);
var client = new Twitter(Keys.twitter);

// console.log(spotify);
// console.log(client);

// Store user command from process.argv[2] into variable "command"
var command = process.argv[2];
var nameOfItem = process.argv.slice(3).join(" ").trim();
console.log(nameOfItem);

// Switch statement that determines what function will run if the case matches the command
switch (command) {
    case "my-tweets":
        console.log("my-tweets");
        var params = { screen_name: '@CarlosM12927691', count: 20 };
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error) {
                console.log(tweets);
                for (var i = 0; i < tweets.length; i++) {
                    console.log("Tweet: " + '"' + tweets[i].text + '"' + "\nDate: " + tweets[i].created_at + "\n");
                };
            } else {
                console.log(error);
            };
        });
        break;
    case "spotify-this-song":
        console.log("spotify-this-song");
        spotify.search({ type: 'track', query: nameOfItem }, function (error, data) {
            if (error) {
                return console.log('Error occurred: ' + error);
            };
            console.log(data);
        });
        break;
    case "movie-this":
        console.log("movie-this");
        break;
    case "do-what-it-says":
        console.log("do-what-it-says");
        break;
};