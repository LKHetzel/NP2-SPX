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
# NP2-SPX Bridge

**Bridge NowPlaying2 track data directly to SPX Graphics for automated lower third graphics.**

Automatically pulls "now playing" track information from NowPlaying2 and updates SPX Graphics rundown items in real-time. Perfect for DJ streams, radio shows, and live broadcasts.

## Features

- 🎵 **Real-time sync** - Automatically updates SPX graphics when tracks change
- 🎬 **Manual control** - Graphics update data but don't auto-play (controlled via Bitfocus Companion)
- 🎛️ **Companion integration** - Optional button feedback system with visual indicators
- 🔧 **Configurable** - Flexible setup via environment variables
- 🎨 **Custom templates** - Includes polished lower third template with animations

## Prerequisites

- **Node.js** (v14+ recommended)
- **SPX Graphics** server running
- **NowPlaying2** with WebSocket output enabled
- **Bitfocus Companion** (optional, for manual control)

## Installation

1️⃣ **Clone and install:**
```bash
git clone https://github.com/LKHetzel/NP2-SPX
cd np2-spx
npm install
```

2️⃣ **Configure environment:**
```bash
cp env_template .env
```

3️⃣ **Edit `.env` file with your settings:**
```env
# NowPlaying2 SocketIO Connection
NP2_HOST=localhost
NP2_PORT=9091

# SPX Graphics Server
SPX_HOST=localhost
SPX_PORT=5656
SPX_PROJECT=
SPX_RUNDOWN=
SPX_ITEMID=Lower3rd
SPX_TEMPLATE_PATH=path/to/your/template.html

# SPX Playout Settings
SPX_CASPAR_SERVER=OVERLAY
SPX_CASPAR_CHANNEL=1
SPX_CASPAR_LAYER=20
SPX_WEBPLAYOUT_LAYER=20

# Companion Feedback (Optional)
ENABLE_COMPANION_FEEDBACK=true
COMPANION_HOST=localhost
COMPANION_PORT=8000
STATUS_PORT=3001
```
The env.template/.env file explains these variables in more detail.

4️⃣ **Add SPX template:**
- Copy the `NP2_Lowerthird.html` template to your SPX `templates/vendor/pack/` directory
- Or update `SPX_TEMPLATE_PATH` to match your template location

5️⃣ **Set up SPX rundown:**
- Create a project and set `SPX_PROJECT` to the name of your project.
- Create a rundown and set `SPX_RUNDOWN` to the name of the rundown.
- Add a rundown item with ID `Lower3rd` (or whatever you want to call it and set `SPX_ITEMID` to that name.
- Assign the template to this rundown item

## Usage

**Start the bridge:**
```bash
npm start
```

The bridge will:
- ✅ Connect to NowPlaying2 WebSocket
- ✅ Listen for track changes  
- ✅ Update SPX rundown item data automatically
- ✅ Send Companion triggers (if enabled)

**Control playback:**
- Graphics data updates automatically but won't auto-play
- Use Bitfocus Companion or SPX GUI to trigger playout
- Manual control prevents interrupting currently visible graphics

## Bitfocus Companion Setup

### Basic Control (Required)

1️⃣ **Install SPX Graphics Controller module in Companion:**
- Add instance: `SPX Graphics Controller`
- Configure connection to your SPX server (typically `localhost:5656`)

2️⃣ **Create control buttons:**

**Play Button:**
- **Action**: `SPX Graphics Controller: Control Rundown Item`
- **Project**: `Project Name`
- **Rundown**: `Rundown Name`
- **Item ID**: `ItemID`
- **Command**: `Play`

**Stop Button:**
- **Action**: `SPX Graphics Controller: Control Rundown Item`
- **Project**: `Project Name`
- **Rundown**: `Rundown Name`
- **Item ID**: `ItemID`
- **Command**: `Stop`

### Advanced: Button Feedback (Optional)

If `ENABLE_COMPANION_FEEDBACK=true`, you can set up visual button feedback that shows when new track data is ready.

#### Step 1: Configure OSC in Companion

**In Companion, add an OSC instance:**

1️⃣ **Add Instance:**
- **Type**: `Generic: OSC`
- **Label**: `NP2 Bridge`
- **Target IP**: `127.0.0.1` (localhost)
- **Target Port**: `8000` (or your `COMPANION_PORT`)
- **Listen Port**: `8001` (different than target port)

#### Step 2: Create Triggers

**Go to the "Triggers" tab:**

1️⃣ **Create "New Track" Trigger:**
- **Events**: `Generic OSC: OSC message received`
- **Instance**: `NP2 Bridge` (your OSC instance)
- **Conditions**: 
  - OSC Path = `/new-track`
- **Actions**:
  - `Internal: Set custom variable`
  - **Variable**: `new_track`
  - **Value**: `1`

2️⃣ **Create "Reset" Action on your Play Button:**
- **Action 1**: `SPX Graphics Controller: Control Rundown Item` (play the graphic)
- **Action 2**: `Internal: Set custom variable`
  - **Variable**: `new_track` 
  - **Value**: `0`

#### Step 3: Add Button Feedback

**On your Play button:**
- **Feedbacks** → **Add Feedback**
- **Type**: `Internal: Custom variable`
- **Variable**: `$(internal:new_track)`
- **Comparison**: `Equal`
- **Value**: `1`
- **Style Override**: Orange/Red background (or whichever colors you prefer)

**How it works:**
1. 🎵 New track → Node.js sends OSC `/new-track` → Button turns the color of your style override
2. 🎬 Press button → Plays graphic + resets variable → Button turns the base button color

## Troubleshooting

**Connection Issues:**
- Verify NowPlaying2 WebSocket is enabled and accessible
- Check SPX server is running and API is accessible
- Confirm firewall/network settings allow connections

**Template Issues:**
- Ensure template file is in correct SPX templates directory
- Check SPX rundown item is properly configured
- Verify template path in `.env` matches actual location

**Companion Feedback:**
- Confirm Companion OSC instance is configured and running
- Check OSC path matches exactly (`/new-track`)
- Verify `COMPANION_HOST` and `COMPANION_PORT` are correct (default 8000)
- Test OSC connection using Companion's OSC tester

**Debug:**
- Check console output for connection status and errors
- Visit `http://localhost:3001/status` (if feedback enabled) for current state
- Enable SPX API logging for detailed request/response info

## License

GNU AFFERO GENERAL PUBLIC LICENSE - See LICENSE for more information.
