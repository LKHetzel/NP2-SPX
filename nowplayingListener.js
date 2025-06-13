require('dotenv').config();

const { io } = require("socket.io-client");
const EventEmitter = require('events');

const HOST = process.env.NP2_SOCKET_SERVER || "localhost";
const PORT = process.env.NP2_SOCKET_PORT || 9091;

const socket = io(`ws://${HOST}:${PORT}`);

let trackTitle = '';
let trackArtist = '';
let trackLabel = '';
let trackArtwork = '';

const emitter = new EventEmitter();

console.log("Starting NP2 Socket Client...");
console.log(`Host: ${HOST}\nPort: ${PORT}`);

socket.on("track-update", function(data) {
    trackTitle = data.title;
    trackArtist = data.artist;
    trackLabel = data.label;
    trackArtwork = data.artwork;
    console.log("--Latest Data--");
    console.log(`Title: ${trackTitle}`);
    console.log(`Artist: ${trackArtist}`);
    console.log(`Label: ${trackLabel}`);
    console.log(`Artwork: ${trackArtwork}`);
    emitter.emit('track-updated', {
        title: trackTitle,
        artist: trackArtist,
        label: trackLabel,
        artwork: trackArtwork
    });
});

module.exports = {
    getTrackTitle: () => trackTitle,
    getTrackArtist: () => trackArtist,
    getTrackLabel: () => trackLabel,
    getTrackArtwork: () => trackArtwork,
    eventEmitter: emitter
};