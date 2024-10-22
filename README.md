# NP2-SPX
A socket receiver from NowPlaying2 that triggers CG scenes in SPX Graphics.

# How?
This is accomplished through the fact that the creators of NowPlaying2 have an option in the network settings to export data via Socket.io.


## What this does:
This program sets up a socket.io listener to receive the track data, and parse it into an API call to your SPX Graphics Server, allowing you to use SPX Graphics instead of the NowPlaying2 graphics.

## What this does NOT do:
This does not pass any graphics output by NowPlaying2. This also does not provide any graphics templates for SPX.

## Simply Put:
This app takes Track Name, Artist Name, and Label Name from NowPlaying2, and sends that data to SPX, so you can use it in any way you see fit within SPX.

# TODOs
- Build a package for this
- Find a way to write to a rundown without automatic playout for better control with StreamDeck/Companion/other control surfaces
- Better documentation on obtaining layer data from SPX for configuration.
- Document what needs to change for the user to set templates to be used in SPX
- API Key support for SPX.
- Maybe convert this to a plugin for SPX so it runs natively? 

# Requirements
1. NowPlaying2: https://www.nowplaying2.com
2. SPX Graphics: Free or Paid version https://spx.graphics
3. Some knowledge of how SPX layers graphics or at least where to find this information in your rundown/project.

# Installation and Configuration
## Installation
1. For now, clone this repo 
2. Install dependecies with `npm i` 
TODO - Churn a package for this to run.

## Configuration
### NowPlaying2 Configuration
1. Open NowPlaying2 and go to the Network Panel (Ethernet Jack icon on the left), and go to "Other Apps".
2. Under "Custom Socket.io Data Export", toggle the switch to On.
3. (Optional) Change the port number.
4. Restart NowPlaying2 - this is REQUIRED. NowPlaying2 does not start the Socket.IO server until it has been restarted.

You will need the port number (defaults to 9091), and the IP address of the computer running NowPlaying2.

It is acceptable if running NowPlaying2 on the same computer as this application to use `localhost`, `127.0.0.1`, or the main IP address of your computer as the `NP2_HOST` variable, *but the main IP address is preferred.*

### SPX Configuration
You only need to know what the IP address and port SPX is running on is (default port is 5656), and if you have set an API key in your `config.json` file. 

There is no API key set by default, and many users can skip this step.
TODO - API Key support.

It is acceptable if running SPX on the same computer as this application to use `localhost`, `127.0.0.1`, or the main IP address of your computer as the `SPX_HOST` variable.

### App Configuration
1. Make a copy of the `env_template` file and name it `.env`.
2. Edit the new `.env` file.
3. For `NP2_HOST` and `NP2_PORT`, fill in the information you obtained about NowPlaying2.
4. For `SPX_HOST`, `SPX_PORT`, and `SPX_APIKEY`, fill in the information about SPX.
5. Save the file.

### Running the App
To run the app, just run `node test.js` from a terminal/command prompt.

# Troubleshooting
- NowPlaying2 has a log (Lines icon, second from the botton on the left) which will show information about either `Client user socket` or `user socket.io`. Lines referencing these users are this application communicating with NowPlaying2.

# FAQ - Always in progress!
- [Why all the network stuff?!](#why-all-the-network-stuff)

## Why all the network stuff?!
- I run a fairly advanced streaming setup, which includes my DJ laptop running NowPlaying2, a main stream computer running OBS, and a network server that handles all of the SPX requirements. You do NOT need a setup this complex for this to work, but the flexibility is there. If you are doing this all from one computer, setting things to localhost is perfectly fine!

# Like this?
If you like this app and it's useful, you can buy me a coffee/beer/etc if you want to. 

https://ko-fi.com/lkhetzel

What's more useful is seeing this app in action on my DJ streams, over at https://mixcloud.com/djcryptografik

Or at my website https://djcryptografik.com
