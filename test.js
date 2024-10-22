const http = require('http');
const { eventEmitter } = require('./index');

let newTitle = '';
eventEmitter.on('track-updated', (title, artist) => {
    console.log("Got data from socket.");
    newTitle = title;
    newArtist = artist;

    sendTrackUpdate(newTitle, newArtist);
});


function sendTrackUpdate(title,artist) {
    const data = JSON.stringify({
        "casparServer": "OVERLAY",
        "casparChannel": "1",
        "casparLayer": "8",
        "webplayoutLayer": "8",
        "relativeTemplatePath": "softpix/Template_Pack_1.3/NAME_LEFT.html",
        "command": "stop",
        "out": "manual",
        "DataFields": [
            {"field": "f0", "value": title},
            {"field": "f1", "value": artist},
            {"field": "f99", "value": "./themes/Default.css"}
        ]
    });  

const options  = {
    host:     process.env.SPX_HOST,
    port:     process.env.SPX_PORT,
    path:     '/api/v1/directplayout',
    method:   'POST',
    headers:  {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    },
};

const req = http.request(options, (res) => {
    let responseData = '';

    res.on('data', (chunk) => {
        responseData += chunk;
    });

    res.on('end', () => {
        console.log('Response:', responseData);
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(data);
req.end();
}