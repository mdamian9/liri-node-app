require("dotenv").config();

var keys = require("./keys.js");
var spotifyKeys = keys.spotify;
var twitterKeys = keys.twitter;

// console.log(spotifyKeys);
// console.log(twitterKeys);

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