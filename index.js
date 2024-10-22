// Quick and Dirty SocketIO Receiver for NowPlaying2

const { io } = require("socket.io-client");
const EventEmitter = require('events');

// Networking
const HOST = process.env.HOST || "localhost"; // HOST URI - Defaults to localhost
const PORT = process.env.PORT || 9091;      // SocketIO Server Port, default 9091
const socket = io(`ws://${HOST}:${PORT}`);



// Track Data
let trackTitle = '';
let trackArtist = '';
let trackLabel = '';


// Set up eventEmitter
const eventEmitter = new EventEmitter();

console.log("Staring NP2 Socket Client...")
console.log(`Host: ${HOST}\nPort: ${PORT}`)

// Start a socket client and watch for track updates.
socket.on("track-update", function(data) {
    trackTitle = data.title;
    trackArtist = data.artist;
    trackLabel = data.label;
    console.log("--Latest Data--");
    console.log(`Title: ${trackTitle}`);
    console.log(`Artist: ${trackArtist}`);
    console.log(`Label: ${trackLabel}`);
    eventEmitter.emit('track-updated', trackTitle); // emit event when track title updates 
});

// Export the track data using emitter.
module.exports = {
    getTrackTitle: () => trackTitle,
    getTrackArtist: () => trackArtist,
    getTrackLabel: () => trackLabel,
    eventEmitter
};

