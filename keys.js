// A message fired until the .env enclosed credentials are validated by spotify api
console.log('Spotify is validating developer credentials ... ');

// references to the id and secret credentials - process.env directs to the .env file (similar to argv, but based on a file instead of input)
exports.spotify = {
    id:process.env.SPOTIFY_ID,
    secret:process.env.SPOTIFY_SECRET
}