# liri-node-app

Node application that takes in a command and input from the user, and displays information based on input given:

1. *node liri my-tweets* - Displays recent tweets of Twitter account
2. *node liri spotify-this-song <song-name>* - Displays information of a song inputted by user (taken from Spotify API)
3. *node liri movie-this <movie-name>* - Displays information of a movie inputted by user (taken from OMDb API)
4. *node liri do-what-it-says* - Uses fs.readFile to read data from random.txt and determine command and input / then execute command