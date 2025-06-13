require('dotenv').config();

const companionFeedbackEnabled = process.env.ENABLE_COMPANION_FEEDBACK === 'true';
const companionHost = process.env.COMPANION_HOST || 'localhost';
const companionPort = process.env.COMPANION_PORT || 8000;
const statusPort = process.env.STATUS_PORT || 3001;

// State tracking
let currentTrackData = null;
let lastUpdateTime = null;
let hasNewData = false;

// Function to send OSC notification to Companion trigger
async function sendCompanionNotification() {
    if (!companionFeedbackEnabled) return;
    
    console.log(`Sending OSC to ${companionHost}:${companionPort}`);
    
    try {
        const osc = require('node-osc');
        const client = new osc.Client(companionHost, companionPort);
        
        // Send proper OSC message - Companion expects specific format
        const message = new osc.Message('/new-track', 1);
        client.send(message);
        console.log('✅ Sent OSC message: /new-track with argument 1');
        
        setTimeout(() => {
            client.close();
        }, 100);
        
    } catch (err) {
        console.error(`❌ Failed to send OSC: ${err.message}`);
    }
}

// Initialize Companion feedback system
function initializeCompanionFeedback() {
    if (!companionFeedbackEnabled) {
        console.log('Companion feedback disabled');
        return;
    }

    console.log('Companion feedback enabled...');

    // Optional debug status server
    const express = require('express');
    const app = express();

    app.get('/status', (req, res) => {
        res.json({
            hasNewData: hasNewData,
            lastUpdate: lastUpdateTime,
            currentTrack: currentTrackData ? {
                title: currentTrackData.songTitle,
                artist: currentTrackData.artistName,
                label: currentTrackData.labelName
            } : null
        });
    });

    app.listen(statusPort, () => {
        console.log(`Companion debug status server running on port ${statusPort}`);
    });
}

// Handle track data updates
function handleTrackUpdate(np2data) {
    if (!companionFeedbackEnabled) return;

    const newDataString = JSON.stringify(np2data);
    const oldDataString = JSON.stringify(currentTrackData);
    
    if (newDataString !== oldDataString) {
        currentTrackData = np2data;
        lastUpdateTime = Date.now();
        hasNewData = true;
        
        console.log('New track data detected for Companion:', np2data.songTitle, 'by', np2data.artistName);
        
        // Send OSC notification to Companion
        sendCompanionNotification();
    }
}

// Export functions
module.exports = {
    initializeCompanionFeedback,
    handleTrackUpdate,
    isEnabled: () => companionFeedbackEnabled
};