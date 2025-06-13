require('dotenv').config();

const { eventEmitter } = require('./nowplayingListener');
const { sendUpdate } = require('./spxSender');
const { initializeCompanionFeedback, handleTrackUpdate } = require('./companionFeedback');

console.log('SPX NP2 Bridge started...');

// Initialize Companion feedback system (if enabled)
initializeCompanionFeedback();

// Listen for track updates and send to SPX
eventEmitter.on('track-updated', (trackData) => {
    console.log('Received track update, sending to SPX...');
    
    // Map the data properties to match what spxSender expects
    const np2data = {
        songTitle: trackData.title,
        artistName: trackData.artist,
        labelName: trackData.label,
        artworkUrl: trackData.artwork
    };
    
    // Handle Companion feedback (if enabled)
    handleTrackUpdate(np2data);
    
    // Send the update to SPX
    sendUpdate(np2data).catch(err => {
        console.error('Failed to send update to SPX:', err);
    });
});