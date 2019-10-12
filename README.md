# liri-node-app
-----------------------------------------------
# 1. The Basics ===============================
Summary:        Siri-esque node query application - Homework 10 - Trilogy/Vanderbilt Fullstack FSF Bootcamp - July 2019
Submitted by:   Stephen L. Fox

# 2. The Problem ==============================
Searching for pop-culture data requires visiting multiple online applications or user portals; it's kind of a hassle.

# 3. The Purpose ==============================
Liri.js will offer a node interface into several popular APIs — allowing diverse search types in a singular location.

# 4. The Approach =============================
- The app was developed using NODE.js and the FILE-SYSTEM + NODE-SPOTIFY-API node package manager modules.
- Required modules are referenced first, then ...
- Node-Spotify-API offers a straightforward method for authenticating via .env
    + Pass process.argv parameters as variables that can then be set as arguments for the various applications
    + Once process.argv[2] is passed as the inquiry type,
    + process.argv[3+] can be used to specify the query specifics
    + consider errors
    + limit results
- Concert data and movie data can be pulled via traditional api, since CORS aren't necessary
- 'do-what-it-says' query type is created to allow a string to be passed back into the searchTerm and searchType variables that are used within the various function arguments
    + The .txt contents will have to be toString(), and then split(',')
