require("dotenv").config();

var Keys = require("./keys.js");
var Twitter = require("twitter")
var Spotify = require("node-spotify-api");
var Request = require("request");


var spotify = new Spotify(Keys.spotify);
var client = new Twitter(Keys.twitter);

console.log(spotify);
console.log(client);

var command = process.argv[2];

switch (command) {
    case "my-tweets":
        console.log("my-tweets");
        break;
    case "spotify-this-song":
        console.log("spotify-this-song");
        break;
    case "movie-this":
        console.log("movie-this");
        break;
    case "do-what-it-says":
        console.log("do-what-it-says");
        break;
}