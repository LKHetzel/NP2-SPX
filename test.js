const http = require('http');
const { eventEmitter } = require('./index');

eventEmitter.on('track-updated', (newTitle) => {

});

const data = JSON.stringify({
    "playServer": "OVERLAY",
    "playChannel": "1",
    "playLayer": "5",
    "webplayoutLayer": "20",
    "relativeTemplatePath": "softpix/Template_Pack_1.1/INFO_RIGHT.html",
    "command": "stop",
    "DataFields": [
        {"field": "f0", "value": `${newTitle}`},
        {"field": "f99", "value": "./themes/default.css"}
    ]
});

const options  = {
    host:     '192.168.3.10',
    port:     5656,
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